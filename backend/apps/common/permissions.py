from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth import get_user_model

User = get_user_model()

class IsMerchant(BasePermission):
    """
    Allows access only to users with the MERCHANT role or admins.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                    (request.user.role == User.Role.MERCHANT or request.user.is_staff))

class IsAdminOrReadOnly(BasePermission):
    """
    The request is authenticated as an admin, or is a read-only request.
    """
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            (request.user and request.user.is_authenticated and request.user.is_staff)
        )

class IsMerchantOrReadOnly(BasePermission):
    """
    The request is authenticated as a merchant/admin, or is a read-only request.
    """
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            (request.user and request.user.is_authenticated and 
            (request.user.role == User.Role.MERCHANT or request.user.is_staff))
        )
