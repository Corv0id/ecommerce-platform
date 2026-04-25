from django.db import models
from django.conf import settings

class AnalyticsEvent(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="analytics_events")
    session_id = models.CharField(max_length=100, db_index=True)
    event_type = models.CharField(max_length=50, db_index=True)
    path = models.CharField(max_length=255, blank=True)
    payload = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["event_type", "created_at"]),
        ]

    def __str__(self):
        return f"{self.event_type} at {self.created_at}"
