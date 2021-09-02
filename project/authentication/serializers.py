from django.utils.translation import ugettext_lazy as _

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
# from rest_framework.response import Response

from .models import CustomUser
from referral.serializers import UniqlinkSerializer


class CustomUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, validators=[
        UniqueValidator(queryset=CustomUser.objects.all(), message=_("The email address is already used."))
    ])
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UseruniqSerializer(serializers.ModelSerializer):
    # uniqlinks = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name="uniqlink-detail"
    # )
    uniqlinks = UniqlinkSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'uniqlinks']



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        # token['fav_color'] = user.fav_color
        return token
