import uuid
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.http import Http404
import jwt
from .models import Uniqlink
from .serializers import UniqlinkSerializer

class ReferralView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        return Response(data={"hello": "there you are"}, status=status.HTTP_200_OK)



class UniqlinkList(APIView):
    """
    Returns list of unique links.
    Will be used by Generator User.
    """
    permission_classes = (IsAuthenticated,)

    def get_userid(self, request):
        JWT_authenticator = JWTAuthentication()
        response = JWT_authenticator.authenticate(request)
        user, token = response
        user_id = token.payload.get('user_id')
        print('user_id: ', user_id)
        return user_id

    def get(self, request, format=None):
        user_id = self.get_userid(request)
        uniqlinks = Uniqlink.objects.filter(user_id=user_id)
        print('uniqlinks: ', uniqlinks)
        serializer = UniqlinkSerializer(uniqlinks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user_id = self.get_userid(request)
        serializer = UniqlinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=user_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UniqlinkDetail(APIView):
    """
    Returns list of unique links detail.
    Will be used by Generator User.
    """
    permission_classes = (IsAuthenticated,)

    def get_userid(self, request):
        JWT_authenticator = JWTAuthentication()
        response = JWT_authenticator.authenticate(request)
        user, token = response
        user_id = token.payload.get('user_id')
        return user_id

    def get_object(self, pk, user_id):
        pk_str = pk.replace('-','')
        incoming = uuid.UUID(pk_str)
        print('incoming:', incoming)
        try:
            return Uniqlink.objects.get(pk=incoming, user_id=user_id)
            return Uniqlink.objects.get(pk=incoming)
        except Uniqlink.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user_id = self.get_userid(request)
        uniqlink = self.get_object(pk, user_id)
        serializer = UniqlinkSerializer(uniqlink)
        return Response(serializer.data)
