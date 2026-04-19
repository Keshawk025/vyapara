from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("order", "stripe_payment_intent_id", "amount", "status")
    search_fields = ("stripe_payment_intent_id", "order__user__username")
