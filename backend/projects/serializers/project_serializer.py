from rest_framework import serializers

from projects.models import Project


class ProjectSerializer(serializers.ModelSerializer):

    organization_name = serializers.CharField( source="organization.name", read_only=True,)

    owner_name = serializers.CharField( source="owner.email", read_only=True, )

    principal_investigator_name = serializers.CharField( source="principal_investigator.full_name", read_only=True,)

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
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
            "organization_name",
            "owner",
            "owner_name",
            "principal_investigator",
            "principal_investigator_name",
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
            "principal_investigator_name",
            "organization_name",
            "owner",
            "owner_name",
            "created_at",
            "updated_at",
        )