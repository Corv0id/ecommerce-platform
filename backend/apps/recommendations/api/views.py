from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.recommendations.services import RecommendationService
from apps.catalog.api.serializers import ProductSerializer

class RecommendationViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def popular(self, request):
        products = RecommendationService.get_popular_products(limit=10)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def log_view(self, request):
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"error": "product_id required"}, status=400)
            
        from apps.catalog.models import Product
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "product not found"}, status=404)

        RecommendationService.log_interaction(
            product=product,
            user=request.user if request.user.is_authenticated else None,
            session_key=request.session.session_key if hasattr(request, 'session') else None,
        )
        return Response({"status": "logged"})
