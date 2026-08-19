from django.conf import settings
from django.db import models

from core.choices import OrganizationRole
from core.models import TimeStampedModel, UUIDPrimaryKeyModel


"""
Organization model.
"""

from django.db import models
from django.utils.text import slugify

from core.choices import OrganizationType
from core.models import TimeStampedModel, UUIDPrimaryKeyModel


class Organization(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    Represents an organization on the platform.
    """

    name = models.CharField(
        max_length=255,
        unique=True,
    )

    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
    )

    short_name = models.CharField(
        max_length=100,
        blank=True,
    )

    organization_type = models.CharField(
        max_length=30,
        choices=OrganizationType.choices,
    )

    description = models.TextField(
        blank=True,
    )

    website = models.URLField(
        blank=True,
    )

    email = models.EmailField(
        blank=True,
    )

    phone_number = models.CharField(
        max_length=30,
        blank=True,
    )

    logo = models.ImageField(
        upload_to="organizations/logos/",
        blank=True,
        null=True,
    )

    country = models.CharField(
        max_length=100,
        blank=True,
    )

    state = models.CharField(
        max_length=100,
        blank=True,
    )

    city = models.CharField(
        max_length=100,
        blank=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Organization"
        verbose_name_plural = "Organizations"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

"""
Organization membership model.
"""


class Membership(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    Connects users to organizations.
    """

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="memberships",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="memberships",
    )

    role = models.CharField(
        max_length=30,
        choices=OrganizationRole.choices,
        default=OrganizationRole.MEMBER,
    )

    is_active = models.BooleanField(
        default=True,
    )

    joined_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["organization", "user"]
        constraints = [
            models.UniqueConstraint(
                fields=["organization", "user"],
                name="unique_membership",
            )
        ]

    def __str__(self):
        return f"{self.user.email} - {self.organization.name}"
    


