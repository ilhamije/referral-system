import uuid
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import Http404
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

    def get(self, request, format=None):
        uniqlinks = Uniqlink.objects.all()
        serializer = UniqlinkSerializer(uniqlinks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UniqlinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UniqlinkDetail(APIView):
    """
    Returns list of unique links detail.
    Will be used by Generator User.
    """

    def get_object(self, pk):
        pk_str = pk.replace('-','')
        incoming = uuid.UUID(pk_str)
        print('incoming:', incoming)
        try:
            return Uniqlink.objects.get(pk=incoming)
        except Uniqlink.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        uniqlink = self.get_object(pk)
        print(uniqlink)
        serializer = UniqlinkSerializer(uniqlink)
        return Response(serializer.data)
