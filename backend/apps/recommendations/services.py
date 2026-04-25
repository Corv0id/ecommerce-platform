from django.db.models import Count
from apps.catalog.models import Product
from apps.recommendations.models import UserInteraction

class RecommendationService:
    @staticmethod
    def get_popular_products(limit=10):
        """
        Returns the most interacted-with products.
        """
        popular = Product.objects.filter(
            userinteraction__isnull=False,
            status=Product.Status.PUBLISHED
        ).annotate(
            interaction_count=Count('userinteraction')
        ).order_by('-interaction_count')[:limit]
        
        # Fallback to newest products if no interactions exist
        if not popular.exists():
            return Product.objects.filter(status=Product.Status.PUBLISHED).order_by('-created_at')[:limit]
        
        return popular

    @staticmethod
    def log_interaction(product, user=None, session_key=None, interaction_type=UserInteraction.InteractionType.VIEW):
        weight = 1.0
        if interaction_type == UserInteraction.InteractionType.ADD_TO_CART:
            weight = 3.0
        elif interaction_type == UserInteraction.InteractionType.PURCHASE:
            weight = 5.0

        UserInteraction.objects.create(
            user=user if user and user.is_authenticated else None,
            session_key=session_key if not (user and user.is_authenticated) else None,
            product=product,
            interaction_type=interaction_type,
            weight=weight
        )
