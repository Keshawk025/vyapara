from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Order
from .serializers import CreateOrderSerializer, OrderSerializer
from .services import create_order_from_cart


class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.prefetch_related("items")
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateOrderSerializer
        return OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = create_order_from_cart(request.user, serializer.validated_data["shipping_address"])
        return Response(OrderSerializer(order, context={"request": request}).data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.prefetch_related("items")
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(user=self.request.user)
