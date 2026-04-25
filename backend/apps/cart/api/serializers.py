from rest_framework import serializers
from apps.cart.models import Cart, CartLine
from apps.catalog.api.serializers import ProductVariantSerializer

class CartLineSerializer(serializers.ModelSerializer):
    variant_details = ProductVariantSerializer(source="variant", read_only=True)

    class Meta:
        model = CartLine
        fields = ["id", "variant", "variant_details", "quantity", "created_at", "updated_at"]

class CartSerializer(serializers.ModelSerializer):
    lines = CartLineSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "session_key", "currency", "lines", "total_price", "created_at", "updated_at"]

    def get_total_price(self, obj):
        total = 0
        for line in obj.lines.all():
            price = line.variant.price_override or line.variant.product.base_price
            total += float(price) * line.quantity
        return total
