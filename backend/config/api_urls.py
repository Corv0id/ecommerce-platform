from django.urls import include, path

urlpatterns = [
    path("accounts/", include("apps.accounts.api.urls")),
    path("catalog/", include("apps.catalog.api.urls")),
    path("cart/", include("apps.cart.api.urls")),
    path("orders/", include("apps.orders.api.urls")),
    path("payments/", include("apps.payments.api.urls")),
    path("recommendations/", include("apps.recommendations.api.urls")),
    path("analytics/", include("apps.analytics.api.urls")),
    path("notifications/", include("apps.notifications.api.urls")),
]
