from django.contrib.auth import get_user_model

from apps.accounts.exceptions import EmailAlreadyRegistered

User = get_user_model()


class AuthService:
    @staticmethod
    def register_user(*, email: str, password: str, first_name: str = "", last_name: str = "") -> User:
        candidate = email.strip().lower()
        if User.objects.filter(email__iexact=candidate).exists():
            raise EmailAlreadyRegistered()
        user = User.objects.create_user(
            email=candidate,
            password=password,
            first_name=(first_name or "").strip(),
            last_name=(last_name or "").strip(),
        )
        from apps.accounts.models import UserProfile
        UserProfile.objects.create(user=user)
        return user
