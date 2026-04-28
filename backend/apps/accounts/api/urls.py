from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.accounts.api.views import LoginView, MeView, RefreshView, RegisterView, AddressViewSet, WishlistViewSet

app_name = "accounts"

router = DefaultRouter()
router.register(r'addresses', AddressViewSet, basename='address')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", LoginView.as_view(), name="token_obtain"),
    path("token/refresh/", RefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
    path("", include(router.urls)),
]
