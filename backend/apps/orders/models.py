from django.db import models
from django.conf import settings
from apps.catalog.models import ProductVariant

class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"
        SHIPPED = "SHIPPED", "Shipped"
        DELIVERED = "DELIVERED", "Delivered"
        CANCELLED = "CANCELLED", "Cancelled"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    currency = models.CharField(max_length=3, default="USD")
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    shipping_address = models.JSONField(default=dict, blank=True)
    billing_address = models.JSONField(default=dict, blank=True)
    placed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-placed_at"]

    def __str__(self):
        return f"Order {self.id} - {self.status}"

class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="lines")
    variant = models.ForeignKey(ProductVariant, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    line_total = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.variant.sku if self.variant else 'Deleted'} in Order {self.order.id}"

    def save(self, *args, **kwargs):
        self.line_total = float(self.unit_price) * self.quantity
        super().save(*args, **kwargs)
