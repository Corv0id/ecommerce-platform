from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.payments.services import PaymentService
from apps.orders.tasks import send_order_confirmation_email
from apps.payments.models import PaymentIntent

class StripeWebhookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.data
        # In a real app, verify Stripe signature here using stripe.Webhook.construct_event
        
        success = PaymentService.handle_webhook_event(payload)
        
        if success:
            provider_ref = payload.get("data", {}).get("id")
            if provider_ref:
                try:
                    intent = PaymentIntent.objects.get(provider_ref=provider_ref)
                    if intent.status == PaymentIntent.Status.SUCCEEDED:
                        send_order_confirmation_email.delay(intent.order.id)
                except PaymentIntent.DoesNotExist:
                    pass
            return Response({"status": "success"}, status=status.HTTP_200_OK)
        return Response({"status": "ignored or invalid"}, status=status.HTTP_400_BAD_REQUEST)
