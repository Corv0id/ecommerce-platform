from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.accounts.api.serializers import RegisterSerializer, UserSerializer
from apps.accounts.exceptions import EmailAlreadyRegistered
from apps.accounts.services.auth_service import AuthService
from apps.accounts.services.token_service import TokenService


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = AuthService.register_user(**serializer.validated_data)
        except EmailAlreadyRegistered:
            return Response(
                {"detail": "A user with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        tokens = TokenService.issue_pair_for_user(user)
        payload = {"user": UserSerializer(user).data, **tokens}
        return Response(payload, status=status.HTTP_201_CREATED)


class MeView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]


class RefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
