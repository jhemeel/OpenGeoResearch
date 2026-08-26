from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserListSerializer


class UserListView(generics.ListAPIView):
    """
    Return active users available for selection.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = UserListSerializer

    queryset = User.objects.filter(
        is_active=True
    ).order_by("email")