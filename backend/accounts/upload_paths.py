"""
Upload path utilities for the accounts application.
"""

from pathlib import Path


def user_profile_photo_path(instance, filename):
    """
    Upload path for user profile photos.

    Example:
        users/<uuid>/profile/avatar.jpg
    """

    extension = Path(filename).suffix.lower()

    return (
        f"users/"
        f"{instance.id}/"
        f"profile/"
        f"profile_photo{extension}"
    )