from rest_framework import serializers

class AnalyticsEventBatchSerializer(serializers.Serializer):
    event_type = serializers.CharField(max_length=50)
    path = serializers.CharField(max_length=255, required=False, allow_blank=True)
    payload = serializers.JSONField(required=False, default=dict)
