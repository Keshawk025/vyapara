from rest_framework import status
from rest_framework.test import APITestCase

from .models import Product


class ProductTests(APITestCase):
    def setUp(self):
        Product.objects.create(
            name="Noise Cancelling Headphones",
            description="Premium wireless headphones",
            price="199.99",
            stock=10,
            category="Electronics",
        )

    def test_public_product_list(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
