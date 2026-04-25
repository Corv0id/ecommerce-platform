from django.db import models
from apps.orders.models import Order
import uuid

class PaymentIntent(models.Model):
    class Status(models.TextChoices):
        REQUIRES_PAYMENT_METHOD = "REQUIRES_PAYMENT_METHOD", "Requires Payment Method"
        PROCESSING = "PROCESSING", "Processing"
        SUCCEEDED = "SUCCEEDED", "Succeeded"
        FAILED = "FAILED", "Failed"

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment_intent")
    provider_ref = models.CharField(max_length=255, blank=True, null=True, help_text="Stripe PaymentIntent ID")
    client_secret = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")
    status = models.CharField(max_length=50, choices=Status.choices, default=Status.REQUIRES_PAYMENT_METHOD)
    idempotency_key = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"PaymentIntent for Order {self.order.id} - {self.status}"
