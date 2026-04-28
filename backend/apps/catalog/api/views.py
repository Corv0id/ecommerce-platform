from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from apps.catalog.models import Category, Product
from apps.catalog.api.serializers import CategorySerializer, ProductSerializer
from apps.common.permissions import IsMerchantOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsMerchantOrReadOnly]
    lookup_field = "slug"

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsMerchantOrReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Product.objects.prefetch_related("variants__inventory", "images").select_related("category").filter(status=Product.Status.PUBLISHED)
        category_slug = self.request.query_params.get('category', None)
        if category_slug and category_slug.lower() != 'all':
            try:
                category = Category.objects.get(slug=category_slug)
                # Include products in this category AND all its descendants
                categories_to_include = [category.id]
                descendants = category.subcategories.all()
                for desc in descendants:
                    categories_to_include.append(desc.id)
                queryset = queryset.filter(category_id__in=categories_to_include)
            except Category.DoesNotExist:
                pass
        return queryset

    @action(detail=False, methods=['get'])
    def smart_search(self, request):
        query = request.query_params.get('q', '').lower()
        if not query:
            return Response([])

        # Simulating NLP Semantic Search with keyword mapping
        # In a real app, this would hit Pinecone/OpenAI embeddings
        qs = self.get_queryset()
        
        # Simple heuristic mappings
        if 'soirée' in query or 'élégant' in query or 'fête' in query or 'habillé' in query:
            qs = qs.filter(category__slug__in=['men-pantalon', 'women-robes', 'men-montres', 'women-parfum'])
        elif 'été' in query or 'plage' in query or 'chaud' in query:
            qs = qs.filter(category__slug__in=['women-robes', 'men-pull'])
        elif 'travail' in query or 'bureau' in query or 'pro' in query:
            qs = qs.filter(category__slug__in=['women-sacs', 'men-pantalon', 'men-montres'])
        
        # Add basic text search fallback
        words = query.split()
        for word in words:
            if len(word) > 3:
                qs = qs | self.get_queryset().filter(name__icontains=word) | self.get_queryset().filter(description__icontains=word)
        
        qs = qs.distinct()[:8] # Limit to 8 best matches
        
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
