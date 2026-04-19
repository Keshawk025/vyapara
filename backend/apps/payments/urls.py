from django.urls import path

from .views import ConfirmPaymentView, CreatePaymentIntentView

urlpatterns = [
    path("create-intent/", CreatePaymentIntentView.as_view(), name="create-payment-intent"),
    path("confirm/", ConfirmPaymentView.as_view(), name="confirm-payment"),
]
