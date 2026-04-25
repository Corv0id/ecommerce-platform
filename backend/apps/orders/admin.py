from django.contrib import admin
from apps.orders.models import Order, OrderLine

class OrderLineInline(admin.TabularInline):
    model = OrderLine
    extra = 0
    readonly_fields = ("unit_price", "line_total")

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "status", "total_amount", "currency", "placed_at")
    list_filter = ("status", "placed_at")
    search_fields = ("id", "user__email")
    readonly_fields = ("total_amount", "placed_at", "updated_at")
    inlines = [OrderLineInline]

@admin.register(OrderLine)
class OrderLineAdmin(admin.ModelAdmin):
    list_display = ("order", "variant", "quantity", "unit_price", "line_total")
    search_fields = ("order__id", "variant__sku")
