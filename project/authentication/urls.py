from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (CustomUserCreate, UseruniqView, UseruniqDetail,
                    ObtainTokenPairView)

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/uniq/', UseruniqView.as_view(), name="user-uniq"),
    path('user/uniq/<str:pk>', UseruniqDetail.as_view(), name="user-uniq-detail"),
    path('token/obtain/', ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
