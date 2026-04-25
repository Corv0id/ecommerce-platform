from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.cart.models import Cart, CartLine
from apps.cart.api.serializers import CartSerializer, CartLineSerializer

class CartViewSet(viewsets.GenericViewSet):
    queryset = Cart.objects.prefetch_related("lines__variant__product")
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user = self.request.user
        if user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=user)
        else:
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()
                session_key = self.request.session.session_key
            cart, _ = Cart.objects.get_or_create(session_key=session_key)
        return cart

    @action(detail=False, methods=["get"])
    def my_cart(self, request):
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def add_item(self, request):
        cart = self.get_object()
        variant_id = request.data.get("variant_id")
        quantity = int(request.data.get("quantity", 1))

        if not variant_id:
            return Response({"error": "variant_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        line, created = CartLine.objects.get_or_create(cart=cart, variant_id=variant_id)
        if not created:
            line.quantity += quantity
        else:
            line.quantity = quantity
        line.save()

        serializer = self.get_serializer(cart)
        return Response(serializer.data)
