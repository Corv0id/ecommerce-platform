from django.urls import path
from apps.analytics.api.views import AnalyticsIngestView, ChurnAnalyticsView

app_name = "analytics"

urlpatterns = [
    path("events/", AnalyticsIngestView.as_view(), name="events_ingest"),
    path("churn-stats/", ChurnAnalyticsView.as_view(), name="churn_stats"),
]
