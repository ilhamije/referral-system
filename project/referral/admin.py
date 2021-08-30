from django.contrib import admin
from .models import Uniqlink

class UniqlinkAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'title', 'created', 'expired', 'user_id')

admin.site.register(Uniqlink, UniqlinkAdmin)