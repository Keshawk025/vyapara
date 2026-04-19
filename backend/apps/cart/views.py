from django.db import transaction
from rest_framework import generics, permissions, serializers, status
from rest_framework.response import Response

from apps.products.models import Product
from .models import Cart, CartItem
from .serializers import CartItemSerializer, CartSerializer


def get_or_create_cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_or_create_cart(self.request.user)


class AddToCartView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = get_or_create_cart(request.user)
        product = generics.get_object_or_404(Product, pk=serializer.validated_data["product_id"], is_active=True)
        quantity = serializer.validated_data["quantity"]

        if quantity > product.stock:
            raise serializers.ValidationError({"quantity": "Requested quantity exceeds available stock."})

        with transaction.atomic():
            item, created = CartItem.objects.select_for_update().get_or_create(
                cart=cart,
                product=product,
                defaults={"quantity": quantity},
            )
            if not created:
                item.quantity += quantity
                if item.quantity > product.stock:
                    raise serializers.ValidationError({"quantity": "Requested quantity exceeds available stock."})
                item.save()

        return Response(CartSerializer(cart, context={"request": request}).data, status=status.HTTP_201_CREATED)


class CartItemDetailView(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = CartItem.objects.select_related("product", "cart")

    def get_object(self):
        return generics.get_object_or_404(self.queryset, pk=self.kwargs["pk"], cart__user=self.request.user)

    def patch(self, request, *args, **kwargs):
        item = self.get_object()
        quantity = request.data.get("quantity")
        if quantity is None:
            raise serializers.ValidationError({"quantity": "Quantity is required."})
        try:
            quantity = int(quantity)
        except (TypeError, ValueError) as exc:
            raise serializers.ValidationError({"quantity": "Quantity must be an integer."}) from exc
        if quantity < 1:
            raise serializers.ValidationError({"quantity": "Quantity must be at least 1."})
        if quantity > item.product.stock:
            raise serializers.ValidationError({"quantity": "Requested quantity exceeds available stock."})

        item.quantity = quantity
        item.save(update_fields=["quantity"])
        return Response(CartSerializer(item.cart, context={"request": request}).data)

    def delete(self, request, *args, **kwargs):
        item = self.get_object()
        cart = item.cart
        item.delete()
        return Response(CartSerializer(cart, context={"request": request}).data, status=status.HTTP_200_OK)
