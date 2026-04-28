from rest_framework import serializers
from apps.orders.models import Order, OrderLine
from apps.catalog.api.serializers import ProductVariantSerializer

class OrderLineSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='variant.product.name')
    variant_sku = serializers.ReadOnlyField(source='variant.sku')
    
    class Meta:
        model = OrderLine
        fields = ["id", "product_name", "variant_sku", "quantity", "unit_price", "line_total"]

class OrderSerializer(serializers.ModelSerializer):
    lines = OrderLineSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ["id", "status", "currency", "total_amount", "shipping_address", "billing_address", "placed_at", "lines"]
        read_only_fields = ["id", "placed_at"]
