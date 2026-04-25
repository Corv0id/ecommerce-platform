from django.urls import path
from apps.payments.api.views import StripeWebhookView

app_name = "payments"

urlpatterns = [
    path("webhook/", StripeWebhookView.as_view(), name="webhook"),
]
