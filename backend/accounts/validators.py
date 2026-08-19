"""
Validators for the accounts application.
"""

from django.core.exceptions import ValidationError


def validate_profile_photo(image):
    """
    Validate uploaded profile photos.
    """

    max_size = 5 * 1024 * 1024  # 5 MB

    if image.size > max_size:
        raise ValidationError(
            "Profile photo must not exceed 5 MB."
        )