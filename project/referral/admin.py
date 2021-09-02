from django.contrib import admin
from .models import Uniqlink, Contributor

class UniqlinkAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'title', 'created', 'expired', 'user_id')


class ContributorAdmin(admin.ModelAdmin):
    list_display = ('contributor_email', 'created', 'uniqlink_uuid')

admin.site.register(Uniqlink, UniqlinkAdmin)
admin.site.register(Contributor, ContributorAdmin)