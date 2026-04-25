from django.urls import path
from apps.orders.api.views import CheckoutView

app_name = "orders"

urlpatterns = [
    path("checkout/", CheckoutView.as_view(), name="checkout"),
]
