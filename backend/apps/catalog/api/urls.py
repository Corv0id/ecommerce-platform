from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.catalog.api.views import CategoryViewSet, ProductViewSet

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"products", ProductViewSet, basename="product")

app_name = "catalog"

urlpatterns = [
    path("", include(router.urls)),
]
