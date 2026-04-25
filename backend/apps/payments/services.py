import uuid
from apps.payments.models import PaymentIntent
from apps.orders.models import Order

class PaymentService:
    @staticmethod
    def create_payment_intent(order: Order) -> PaymentIntent:
        """
        Simulates calling a PSP (like Stripe) to create a PaymentIntent.
        """
        # In a real app, we'd call stripe.PaymentIntent.create(...)
        provider_ref = f"pi_simulated_{uuid.uuid4().hex[:16]}"
        client_secret = f"{provider_ref}_secret_{uuid.uuid4().hex[:16]}"

        intent = PaymentIntent.objects.create(
            order=order,
            amount=order.total_amount,
            currency=order.currency,
            provider_ref=provider_ref,
            client_secret=client_secret
        )
        return intent

    @staticmethod
    def handle_webhook_event(payload: dict):
        """
        Simulates receiving a webhook from a PSP and updating order status.
        """
        event_type = payload.get("type")
        data = payload.get("data", {})
        provider_ref = data.get("id")

        if not provider_ref:
            return False

        try:
            intent = PaymentIntent.objects.get(provider_ref=provider_ref)
        except PaymentIntent.DoesNotExist:
            return False

        if event_type == "payment_intent.succeeded":
            intent.status = PaymentIntent.Status.SUCCEEDED
            intent.save()
            
            # Update order status
            intent.order.status = Order.Status.PAID
            intent.order.save()
            return True
            
        elif event_type == "payment_intent.payment_failed":
            intent.status = PaymentIntent.Status.FAILED
            intent.save()
            return True

        return False
