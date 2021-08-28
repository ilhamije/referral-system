from django.urls import path
from .views import ReferralView, UniqlinkList, UniqlinkDetail

urlpatterns = [
    path('', ReferralView.as_view(), name="referral"),
    path('uniqlink/', UniqlinkList.as_view(), name="uniqlink-list"),
    path('uniqlink/<str:pk>', UniqlinkDetail.as_view(), name="uniqlink-detail"),
]
