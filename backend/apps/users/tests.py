from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase


class AuthTests(APITestCase):
    def test_register_user(self):
        response = self.client.post(
            "/api/auth/register/",
            {
                "username": "alice",
                "email": "alice@example.com",
                "password": "strongpass123",
                "first_name": "Alice",
                "last_name": "Doe",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="alice").exists())
