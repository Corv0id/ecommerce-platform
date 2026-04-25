from django.db import models
from django.conf import settings
from apps.catalog.models import Product

class UserInteraction(models.Model):
    class InteractionType(models.TextChoices):
        VIEW = "VIEW", "View"
        ADD_TO_CART = "ADD_TO_CART", "Add to Cart"
        PURCHASE = "PURCHASE", "Purchase"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="interactions", null=True, blank=True)
    session_key = models.CharField(max_length=40, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=20, choices=InteractionType.choices)
    weight = models.FloatField(default=1.0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "product"]),
            models.Index(fields=["session_key", "product"]),
        ]

    def __str__(self):
        return f"{self.interaction_type} on {self.product.name}"
