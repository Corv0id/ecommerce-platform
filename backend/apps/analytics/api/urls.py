from django.urls import path
from apps.analytics.api.views import AnalyticsIngestView

app_name = "analytics"

urlpatterns = [
    path("events/", AnalyticsIngestView.as_view(), name="events_ingest"),
]
