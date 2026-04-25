from django.contrib import admin
from apps.catalog.models import Category, Product, ProductVariant, ProductImage, InventoryLevel

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "parent")
    prepopulated_fields = {"slug": ("name",)}

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "status", "base_price", "created_at")
    list_filter = ("status", "category")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductVariantInline, ProductImageInline]

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ("product", "sku", "price_override")
    search_fields = ("sku", "product__name")

@admin.register(InventoryLevel)
class InventoryLevelAdmin(admin.ModelAdmin):
    list_display = ("variant", "warehouse_id", "quantity_on_hand", "reserved_quantity")
