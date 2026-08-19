"""
Database models for the accounts application.
"""

from __future__ import annotations

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from core.choices import VerificationStatus
from core.models import TimeStampedModel
from core.models import UUIDPrimaryKeyModel

from .managers import UserManager
from .upload_paths import user_profile_photo_path
from .validators import validate_profile_photo


class User(
    UUIDPrimaryKeyModel,
    TimeStampedModel,
    AbstractBaseUser,
    PermissionsMixin,
):
    """
    Custom user model.

    Stores authentication and identity information only.
    Research-specific information belongs in the profiles app.
    """

    email = models.EmailField(
        unique=True,
        db_index=True,
    )

    first_name = models.CharField(
        max_length=150, blank=True, help_text="Optional first name."
    )

    last_name = models.CharField(
        max_length=150, blank=True, help_text="Optional last name."
    )

    display_name = models.CharField(
        max_length=150,
        blank=True,
        help_text="Optional public display name.",
    )

    phone_number = models.CharField(
        max_length=20,
        blank=True,
    )

    profile_photo = models.ImageField(
        upload_to=user_profile_photo_path,
        validators=[validate_profile_photo],
        blank=True,
        null=True,
    )

    verification_status = models.CharField(
        max_length=30,
        choices=VerificationStatus.choices,
        default=VerificationStatus.PENDING,
    )

    is_active = models.BooleanField(
        default=True,
    )

    is_staff = models.BooleanField(
        default=False,
    )

    date_joined = models.DateTimeField(
        auto_now_add=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    class Meta:
        ordering = ["email"]
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self) -> str:
        return self.email


    @property
    def full_name(self):
        """
        Return the user's full name.
        """
        return " ".join(
            part for part in [self.first_name, self.last_name] if part
    )

    @property
    def public_name(self) -> str:
        """
        Returns the preferred display name.
        """
        return self.display_name or self.full_name