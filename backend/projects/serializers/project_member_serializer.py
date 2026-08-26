from rest_framework import serializers

from projects.models import ProjectMember


class ProjectMemberSerializer(serializers.ModelSerializer):
    """
    Serializer for project membership.
    """

    user_name = serializers.CharField(
        source="user.public_name",
        read_only=True,
    )

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    class Meta:
        model = ProjectMember

        fields = (
            "id",
            "project",
            "user",
            "user_name",
            "user_email",
            "role",
            "is_active",
            "joined_at",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "user_name",
            "user_email",
            "joined_at",
            "created_at",
            "updated_at",
        )