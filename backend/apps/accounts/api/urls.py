from django.urls import path

from apps.accounts.api.views import LoginView, MeView, RefreshView, RegisterView

app_name = "accounts"

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", LoginView.as_view(), name="token_obtain"),
    path("token/refresh/", RefreshView.as_view(), name="token_refresh"),
    path("me/", MeView.as_view(), name="me"),
]
