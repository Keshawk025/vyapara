from django.db import transaction
from rest_framework import serializers

from apps.cart.models import Cart
from .models import Order, OrderItem


def create_order_from_cart(user, shipping_address):
    cart = Cart.objects.prefetch_related("items__product").filter(user=user).first()
    if not cart or not cart.items.exists():
        raise serializers.ValidationError({"cart": "Cart is empty."})

    with transaction.atomic():
        order = Order.objects.create(
            user=user,
            shipping_address=shipping_address,
            total_price=cart.total_price,
        )

        for cart_item in cart.items.select_related("product").all():
            product = cart_item.product
            if cart_item.quantity > product.stock:
                raise serializers.ValidationError({"stock": f"Insufficient stock for {product.name}."})

            product.stock -= cart_item.quantity
            product.save(update_fields=["stock"])

            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=product.name,
                unit_price=product.price,
                quantity=cart_item.quantity,
            )

        cart.items.all().delete()

    return order
