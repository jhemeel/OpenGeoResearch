from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from profiles.models import UserProfile, ResearcherProfile
from .serializers import UserProfileSerializer, ResearcherProfileSerializer

from accounts.models import User
from .serializers import (
    UserProfileSerializer,
    ResearcherProfileSerializer,
    ResearcherListSerializer,
)





class MyProfileView(APIView):
    """
    Get current user's profile safely.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)

        researcher = None
        if hasattr(profile, "researcher_profile"):
            try:
                researcher = profile.researcher_profile
            except ResearcherProfile.DoesNotExist:
                researcher = None

        return Response(
            {
                "profile": UserProfileSerializer(profile).data,
                "researcher_profile": (
                    ResearcherProfileSerializer(researcher).data
                    if researcher
                    else None
                ),
            }
        )


class ResearcherListView(APIView):
    """
    Return users who have researcher profiles.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        researchers = (
            User.objects
            .filter(
                is_active=True,
                profile__researcher_profile__isnull=False,
            )
            .order_by(
                "email",
            )
        )

        serializer = ResearcherListSerializer(
            researchers,
            many=True,
        )

        return Response(serializer.data)