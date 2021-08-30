from django.db import models

import uuid
from datetime import datetime, timedelta
from django.db import models

from authentication.models import CustomUser

def expiration_date():
    return datetime.now() + timedelta(days=7)


class Uniqlink(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=20, default='untitled')
    created = models.DateTimeField(auto_now_add=True)
    expired = models.DateTimeField(default=expiration_date(), editable=False)
    user = models.ForeignKey(
        CustomUser, related_name='uniqlinks', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created', 'user']

    def __str__(self):
        return '{}'.format(self.expired)