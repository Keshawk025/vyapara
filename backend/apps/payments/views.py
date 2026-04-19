import stripe
from rest_framework import permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from config.settings import STRIPE_SECRET_KEY
from apps.orders.models import Order
from .models import Payment
from .serializers import PaymentConfirmSerializer, PaymentIntentSerializer

stripe.api_key = STRIPE_SECRET_KEY


class CreatePaymentIntentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PaymentIntentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = Order.objects.filter(id=serializer.validated_data["order_id"], user=request.user).first()
        if not order:
            raise serializers.ValidationError({"order_id": "Order not found."})
        if order.status == Order.Status.PAID:
            raise serializers.ValidationError({"order": "Order has already been paid."})
        if not STRIPE_SECRET_KEY:
            raise serializers.ValidationError({"stripe": "Stripe secret key is not configured."})

        intent = stripe.PaymentIntent.create(
            amount=int(order.total_price * 100),
            currency="usd",
            metadata={"order_id": order.id, "user_id": request.user.id},
            automatic_payment_methods={"enabled": True},
        )

        payment, _ = Payment.objects.update_or_create(
            order=order,
            defaults={
                "stripe_payment_intent_id": intent["id"],
                "amount": order.total_price,
                "currency": "usd",
                "status": intent["status"],
            },
        )
        return Response(
            {
                "client_secret": intent["client_secret"],
                "payment_intent_id": payment.stripe_payment_intent_id,
                "status": payment.status,
            },
            status=status.HTTP_201_CREATED,
        )


class ConfirmPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PaymentConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = Order.objects.filter(id=serializer.validated_data["order_id"], user=request.user).first()
        if not order:
            raise serializers.ValidationError({"order_id": "Order not found."})

        payment = Payment.objects.filter(
            order=order,
            stripe_payment_intent_id=serializer.validated_data["payment_intent_id"],
        ).first()
        if not payment:
            raise serializers.ValidationError({"payment": "Payment record not found."})

        intent = stripe.PaymentIntent.retrieve(payment.stripe_payment_intent_id)
        payment.status = intent["status"]
        payment.save(update_fields=["status", "updated_at"])

        order.status = Order.Status.PAID if intent["status"] == "succeeded" else Order.Status.FAILED
        order.save(update_fields=["status", "updated_at"])

        return Response({"order_status": order.status, "payment_status": payment.status})
