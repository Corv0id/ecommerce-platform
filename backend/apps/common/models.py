from django.db import models

class SystemSettings(models.Model):
    maintenance_mode = models.BooleanField(default=False)
    registration_enabled = models.BooleanField(default=True)
    platform_fee_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=2.50)
    cache_ttl_seconds = models.IntegerField(default=3600)
    admin_contact_email = models.EmailField(default='admin@luxe.com')
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name_plural = "System Settings"

    def __str__(self):
        return "Global System Settings"

    @classmethod
    def get_settings(cls):
        obj, created = cls.objects.get_or_create(id=1)
        return obj
