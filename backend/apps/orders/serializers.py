from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ("id", "product", "product_name", "unit_price", "quantity", "subtotal")
        read_only_fields = fields


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ("id", "user", "items", "total_price", "status", "shipping_address", "created_at", "updated_at")
        read_only_fields = ("id", "user", "items", "total_price", "status", "created_at", "updated_at")


class CreateOrderSerializer(serializers.Serializer):
    shipping_address = serializers.CharField()
