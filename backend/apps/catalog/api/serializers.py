from rest_framework import serializers
from apps.catalog.models import Category, Product, ProductVariant, ProductImage, InventoryLevel

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "parent"]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "url", "is_primary", "sort_order"]

class InventoryLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryLevel
        fields = ["warehouse_id", "quantity_on_hand", "reserved_quantity"]

class ProductVariantSerializer(serializers.ModelSerializer):
    inventory = InventoryLevelSerializer(read_only=True)

    class Meta:
        model = ProductVariant
        fields = ["id", "sku", "price_override", "attributes", "inventory"]

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "description", "category", "status", "base_price", "metadata", "created_at", "updated_at", "variants", "images"]
