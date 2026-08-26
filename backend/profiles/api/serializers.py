from rest_framework import serializers
from profiles.models import UserProfile, ResearcherProfile
from accounts.models import User



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class ResearcherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearcherProfile
        fields = "__all__"


class ResearcherListSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        source="public_name",
        read_only=True,
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
        )