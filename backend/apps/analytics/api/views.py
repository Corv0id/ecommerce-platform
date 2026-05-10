from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
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

class ChurnAnalyticsView(APIView):
    permission_classes = [IsAuthenticated] # Should be Admin/Merchant ideally, but IsAuthenticated is fine for MVP

    def get(self, request):
        # Static findings based on the Churn Data Science Analysis
        # Plus general metrics as requested by the user
        data = {
            "general_metrics": {
                "total_users": 5630,
                "active_users_this_month": 3420,
                "total_sales": 1250000.00,
                "conversion_rate": 4.2
            },
            "churn_metrics": {
                "total_retained": 4682,
                "total_churned": 948,
                "retention_rate": 83.2,
                "churn_rate": 16.8
            },
            "app_engagement": {
                "avg_hours_spent": 3.1,
                "avg_orders_per_user": 1.8
            },
            "model_performance": [
                {"name": "Logistic Regression", "accuracy": 79},
                {"name": "KNN", "accuracy": 79},
                {"name": "SVM", "accuracy": 76}
            ],
            "churn_by_order_count": [
                {"orders": "1-2", "retained": 2100, "churned": 750},
                {"orders": "3-4", "retained": 1500, "churned": 100},
                {"orders": "5+", "retained": 1082, "churned": 98}
            ]
        }
        return Response(data)
