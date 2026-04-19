from rest_framework import serializers


class PaymentIntentSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()


class PaymentConfirmSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    payment_intent_id = serializers.CharField()
