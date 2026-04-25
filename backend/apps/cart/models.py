from django.db import models
from django.conf import settings
from apps.catalog.models import ProductVariant

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name="cart")
    session_key = models.CharField(max_length=40, null=True, blank=True)
    currency = models.CharField(max_length=3, default="USD")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user.email if self.user else 'Guest'}"

class CartLine(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="lines")
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("cart", "variant")

    def __str__(self):
        return f"{self.quantity} x {self.variant.sku} in Cart {self.cart.id}"
