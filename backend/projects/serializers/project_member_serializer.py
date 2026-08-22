from rest_framework import serializers

from projects.models import ProjectMember


class ProjectMemberSerializer(serializers.ModelSerializer):
    """
    Serializer for project membership.
    """

    class Meta:
        model = ProjectMember

        fields = (
            "id",
            "project",
            "user",
            "role",
            "is_active",
            "joined_at",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "joined_at",
            "created_at",
            "updated_at",
        )

