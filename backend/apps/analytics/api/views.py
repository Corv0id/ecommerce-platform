from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from apps.analytics.api.serializers import AnalyticsEventBatchSerializer
from apps.analytics.tasks import process_analytics_batch

class AnalyticsIngestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Allow sending a single event or a list of events
        data = request.data if isinstance(request.data, list) else [request.data]
        serializer = AnalyticsEventBatchSerializer(data=data, many=True)
        
        if serializer.is_valid():
            session_id = request.session.session_key
            if not session_id:
                request.session.create()
                session_id = request.session.session_key
            
            user_id = request.user.id if request.user.is_authenticated else None
            
            events_batch = []
            for item in serializer.validated_data:
                item['session_id'] = session_id
                item['user_id'] = user_id
                events_batch.append(item)
                
            # Send to Celery
            process_analytics_batch.delay(events_batch)
            
            return Response({"status": "accepted"}, status=status.HTTP_202_ACCEPTED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
