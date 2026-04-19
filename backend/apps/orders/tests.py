from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from apps.cart.models import Cart, CartItem
from apps.products.models import Product


class OrderTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="buyer", email="buyer@example.com", password="buyerpass123")
        self.product = Product.objects.create(
            name="Gaming Mouse",
            description="Responsive RGB gaming mouse",
            price="49.99",
            stock=5,
            category="Accessories",
        )
        cart = Cart.objects.create(user=self.user)
        CartItem.objects.create(cart=cart, product=self.product, quantity=2)

        token_response = self.client.post(
            "/api/auth/login/",
            {"username": "buyer", "password": "buyerpass123"},
            format="json",
        )
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token_response.data['access']}")

    def test_create_order_from_cart(self):
        response = self.client.post("/api/orders/", {"shipping_address": "221B Baker Street"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "pending")
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 3)
