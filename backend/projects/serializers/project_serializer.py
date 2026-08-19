from rest_framework import serializers

from projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for creating, updating, and retrieving projects.
    """

    class Meta:
        model = Project

        fields = (
            "id",
            "code",
            "name",
            "slug",
            "organization",
            "owner",
            "principal_investigator",
            "description",
            "objectives",
            "keywords",
            "funding_agency",
            "grant_number",
            "budget",
            "ethics_approval_number",
            "start_date",
            "end_date",
            "status",
            "visibility",
            "is_active",
            "created_at",
            "updated_at",
        )

        # Why are these fields read-only? These should never come from the React client:
        
        read_only_fields = (
            "id",
            "code",
            "slug",
            "created_at",
            "updated_at",
        )