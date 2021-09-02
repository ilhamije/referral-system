from datetime import datetime
from django.urls import reverse
from rest_framework import serializers

from .models import Uniqlink, Contributor


class UniqlinkSerializer(serializers.Serializer):

    class Meta:
        model = Uniqlink
        fields = ['uuid', 'user_id']

    def create(self, validated_data):
        return Uniqlink.objects.create(**validated_data)

    def get_is_expired(self, obj):
        expired_str = "{}".format(obj.expired)
        expired = datetime.fromisoformat(expired_str)
        if expired < datetime.now(expired.tzinfo):
            return True
        return False

    def get_absolute_url(self, obj):
        return reverse('uniqlink-detail',kwargs={'pk': obj.uuid})

    def get_num_contributors(self, obj):
        return Contributor.objects.filter(uniqlink_uuid=obj.uuid).count()

    def to_representation(self, instance: Uniqlink):
        data = dict()
        data['uuid'] = instance.uuid
        # data['url'] = self.get_absolute_url(instance)
        data['url'] = 'http://localhost:3000/code/' + str(instance.uuid)
        data['title'] = instance.title
        data['created'] = instance.created
        data['expired'] = instance.expired
        data['is_expired'] = self.get_is_expired(instance)
        data['user'] = instance.user_id
        data['num_contributors'] = self.get_num_contributors(instance)

        return data


class ContributorSerializer(serializers.ModelSerializer):

    # uniqlink_uuid = serializers.ReadOnlyField(source='uniqlink.uuid')

    class Meta:
        model = Contributor
        fields = ['contributor_email', 'uniqlink_uuid']

    def create(self, validated_data):
        return Contributor.objects.create(**validated_data)