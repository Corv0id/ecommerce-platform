from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from apps.cart.models import Cart
from apps.orders.models import Order, OrderLine

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        user = request.user
        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({"error": "No active cart found"}, status=status.HTTP_400_BAD_REQUEST)

        if not cart.lines.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Create Order
        order = Order.objects.create(
            user=user,
            currency=cart.currency,
            shipping_address=request.data.get("shipping_address", {}),
            billing_address=request.data.get("billing_address", {})
        )

        # 2. Move Cart lines to Order lines
        total_amount = 0
        for line in cart.lines.all():
            price = line.variant.price_override or line.variant.product.base_price
            OrderLine.objects.create(
                order=order,
                variant=line.variant,
                quantity=line.quantity,
                unit_price=price,
                line_total=float(price) * line.quantity
            )
            total_amount += float(price) * line.quantity
            
            # Simple stock decrement (optimistic)
            if hasattr(line.variant, 'inventory'):
                inv = line.variant.inventory
                if inv.quantity_on_hand >= line.quantity:
                    inv.quantity_on_hand -= line.quantity
                    inv.save()
                else:
                    # In real world, we might raise an exception to rollback transaction
                    pass

        order.total_amount = total_amount
        order.save()

        # 3. Clear cart
        cart.lines.all().delete()

        # 4. Trigger PaymentIntent creation
        from apps.payments.services import PaymentService
        intent = PaymentService.create_payment_intent(order)

        return Response({
            "message": "Checkout successful",
            "order_id": order.id,
            "total_amount": total_amount,
            "client_secret": intent.client_secret,
            "provider_ref": intent.provider_ref
        }, status=status.HTTP_201_CREATED)

from rest_framework import viewsets
from apps.orders.api.serializers import OrderSerializer

class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ["ADMIN", "MERCHANT"]:
            return Order.objects.all().prefetch_related('lines__variant__product')
        return Order.objects.filter(user=user).prefetch_related('lines__variant__product')

