from celery import shared_task
from apps.analytics.models import AnalyticsEvent
import logging

logger = logging.getLogger(__name__)

@shared_task
def process_analytics_batch(events_batch):
    """
    Ingests a batch of analytics events asynchronously.
    events_batch should be a list of dictionaries: 
    [{'user_id': 1, 'session_id': 'abc', 'event_type': 'VIEW', 'path': '/', 'payload': {}}]
    """
    try:
        events_to_create = []
        for event_data in events_batch:
            events_to_create.append(
                AnalyticsEvent(
                    user_id=event_data.get('user_id'),
                    session_id=event_data.get('session_id', 'anonymous'),
                    event_type=event_data.get('event_type', 'UNKNOWN'),
                    path=event_data.get('path', ''),
                    payload=event_data.get('payload', {})
                )
            )
        AnalyticsEvent.objects.bulk_create(events_to_create)
        logger.info(f"Successfully ingested {len(events_to_create)} analytics events.")
        return True
    except Exception as e:
        logger.error(f"Failed to ingest analytics batch: {str(e)}")
        return False
