from django.http import Http404
from rest_framework.serializers import Serializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, SlidingToken

from .serializers import (MyTokenObtainPairSerializer,
                        CustomUserSerializer,
                        UseruniqSerializer)
from .models import CustomUser


class CustomUserCreate(APIView):
    """
    Create User
    """
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = {
                    'refresh': str(RefreshToken.for_user(user)),
                    'access': str(RefreshToken.for_user(user).access_token)
                }
                json.update(serializer.data)
                return Response(json, status=status.HTTP_201_CREATED)
        # print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UseruniqView(APIView):
    """
    Gettings all Unique Links of EACH user.
    Can only accessed by admin.
    """
    def get(self, request, format=None):
        useruniqlinks = CustomUser.objects.all()
        serializer = UseruniqSerializer(
            useruniqlinks, many=True, context={'request': request})
        return Response(serializer.data)


class UseruniqDetail(APIView):
    """
    Gettings all Unique Links of specific user.
    """
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        useruniq = self.get_object(pk)
        serializer = UseruniqSerializer(useruniq, context={'request': request})
        return Response(serializer.data)


class ObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
