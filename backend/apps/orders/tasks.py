from celery import shared_task
from apps.orders.models import Order
import logging

logger = logging.getLogger(__name__)

@shared_task
def send_order_confirmation_email(order_id):
    try:
        order = Order.objects.get(id=order_id)
        email = order.user.email if order.user else "guest@example.com"
        # Simulate sending email
        logger.info(f"Simulating sending confirmation email to {email} for Order {order_id}")
        return True
    except Order.DoesNotExist:
        logger.error(f"Order {order_id} not found when trying to send email")
        return False
