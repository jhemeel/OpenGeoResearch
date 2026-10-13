from rest_framework import serializers

from organizations.models import Organization, Membership


class OrganizationSerializer(serializers.ModelSerializer):
    """
    Serializer for creating, updating, and retrieving organizations.
    """

    owner = serializers.SerializerMethodField()

    owner_name = serializers.SerializerMethodField()

    owner_email = serializers.SerializerMethodField()

    member_count = serializers.IntegerField( source="active_member_count", read_only=True,)

    project_count = serializers.IntegerField( source="active_project_count", read_only=True,)

    class Meta:
        model = Organization

        fields = (
            "id",
            "name",
            "slug",
            "short_name",
            "organization_type",
            "description",
            "website",
            "email",
            "phone_number",
            "logo",
            "country",
            "state",
            "city",
            "is_active",

            # Organization ownership
            "owner",
            "owner_name",
            "owner_email",

            # Organization statistics
            "member_count",
            "project_count",

            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "slug",
            "owner",
            "owner_name",
            "owner_email",
            "member_count",
            "project_count",
            "created_at",
            "updated_at",
        )

    def get_owner(self, obj):
        membership = (
            obj.memberships
            .filter(
                role="OWNER",
                is_active=True,
            )
            .select_related("user")
            .first()
        )

        return (
            str(membership.user.id)
            if membership
            else None
        )

    def get_owner_name(self, obj):
        membership = (
            obj.memberships
            .filter(
                role="OWNER",
                is_active=True,
            )
            .select_related("user")
            .first()
        )

        return (
            membership.user.public_name
            if membership
            else None
        )

    def get_owner_email(self, obj):
        membership = (
            obj.memberships
            .filter(
                role="OWNER",
                is_active=True,
            )
            .select_related("user")
            .first()
        )

        return (
            membership.user.email
            if membership
            else None
        )



class MembershipSerializer(serializers.ModelSerializer):
    """
    Serializer for organization membership.
    """

    organization_name = serializers.CharField(
        source="organization.name",
        read_only=True,
    )

    user_name = serializers.CharField(
        source="user.public_name",
        read_only=True,
    )

    user_email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    class Meta:
        model = Membership

        fields = (
            "id",
            "organization",
            "organization_name",
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
            "organization_name",
            "user_name",
            "user_email",
            "joined_at",
            "created_at",
            "updated_at",
        )

