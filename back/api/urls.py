from django.urls import path
from api.views import *


urlpatterns = [
    path('registration/', RegistrationAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('cars/', ListCar.as_view()),
    path('marks/', ListMark.as_view()),
    path('models', ListModel.as_view()),
    path('years/', Years.as_view()),
    path('posts/', ListPost.as_view()),
    path('posts/<int:id>/', PostAPIView.as_view()),
    path('myPosts/', MyPost.as_view()),
]