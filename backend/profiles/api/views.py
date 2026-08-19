from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from profiles.models import UserProfile, ResearcherProfile
from .serializers import UserProfileSerializer, ResearcherProfileSerializer


# class MyProfileView(APIView):
#     """
#     Get current user's profile + researcher profile (if exists)
#     """

#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         profile = UserProfile.objects.get(user=request.user)

#         researcher = None
#         if hasattr(profile, "researcher_profile"):
#             researcher = ResearcherProfile.objects.get(profile=profile)

#         return Response(
#             {
#                 "profile": UserProfileSerializer(profile).data,
#                 "researcher_profile": (
#                     ResearcherProfileSerializer(researcher).data
#                     if researcher
#                     else None
#                 ),
#             }
#         )



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