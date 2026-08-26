from rest_framework import serializers

from .models import User


class UserListSerializer(serializers.ModelSerializer):
    """
    Safe serializer for selecting users in the application.
    """

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

        read_only_fields = (
            "id",
            "email",
            "name",
        )