from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


from apps.accounts.models import Address
from apps.catalog.models import Wishlist
from apps.catalog.api.serializers import ProductSerializer

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ("id", "line1", "line2", "city", "postal_code", "country", "is_default")

class WishlistSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = Wishlist
        fields = ("id", "product", "product_details", "created_at")

class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "role", "date_joined", "addresses")
        read_only_fields = ("id", "email", "date_joined")


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8, max_length=128)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=150)

    def validate_email(self, value):
        return value.strip().lower()
