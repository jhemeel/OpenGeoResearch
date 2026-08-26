from rest_framework import serializers

from organizations.models import Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = (
            "id",
            "name",
            "short_name",
            "organization_type",
            "country",
            "state",
            "city",
            "is_active",
        )
        read_only_fields = (
            "id",
        )