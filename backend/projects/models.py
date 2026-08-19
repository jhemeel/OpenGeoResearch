from django.db import models
from django.db.models import Q

from core.models import TimeStampedModel
from core.models import UUIDPrimaryKeyModel
from django.core.exceptions import ValidationError


from django.conf import settings
from django.utils.text import slugify

from organizations.models import Organization

from core.choices import (
    ProjectStatus,
    ProjectVisibility,
    ProjectRole,
)



class ProjectSequence(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    Stores the latest project number for each year.
    """

    year = models.PositiveIntegerField(
        unique=True,
    )

    last_number = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        ordering = ["-year"]
        verbose_name = "Project Sequence"
        verbose_name_plural = "Project Sequences"

    def __str__(self):
        return f"{self.year} - {self.last_number}"


class Project(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    Represents a research project within an organization.
    """

    # ==========================================================
    # Identity
    # ==========================================================

    code = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        help_text="Automatically generated project code.",
    )

    name = models.CharField(
        max_length=255,
        help_text="Official project title.",
    )

    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        help_text="Automatically generated URL slug.",
    )

    # ==========================================================
    # Ownership
    # ==========================================================

    organization = models.ForeignKey(
        Organization,
        on_delete=models.PROTECT,
        related_name="projects",
        help_text="Organization that owns this project.",
    )

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="owned_projects",
        help_text="User who created and owns the project.",
    )

    principal_investigator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="principal_investigator_projects",
        null=True,
        blank=True,
        help_text="Principal Investigator for the project.",
    )

    # ==========================================================
    # Research Information
    # ==========================================================

    description = models.TextField(
        blank=True,
        help_text="Brief description of the research project.",
    )

    objectives = models.TextField(
        blank=True,
        help_text="Research objectives.",
    )

    keywords = models.TextField(
        blank=True,
        help_text="Comma-separated keywords for searching and classification.",
    )

    # ==========================================================
    # Funding & Timeline
    # ==========================================================

    funding_agency = models.CharField(
        max_length=255,
        blank=True,
        help_text="Funding organization supporting the project.",
    )

    grant_number = models.CharField(
        max_length=100,
        blank=True,
        help_text="Official grant or award number.",
    )

    budget = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Approved project budget.",
    )

    ethics_approval_number = models.CharField(
        max_length=100,
        blank=True,
        help_text="Ethics approval reference number.",
    )

    start_date = models.DateField(
        null=True,
        blank=True,
        db_index=True,
    )

    end_date = models.DateField(
        null=True,
        blank=True,
        db_index=True,
    )

    # ==========================================================
    # Status & Lifecycle
    # ==========================================================

    status = models.CharField(
        max_length=20,
        choices=ProjectStatus.choices,
        default=ProjectStatus.DRAFT,
        help_text="Current lifecycle status of the project.",
    )

    visibility = models.CharField(
        max_length=20,
        choices=ProjectVisibility.choices,
        default=ProjectVisibility.PRIVATE,
        help_text="Controls who can view this project.",
    )

    is_active = models.BooleanField(
        default=True,
        help_text="Indicates whether the project is active.",
    )


    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

        indexes = [
            
            models.Index(fields=["status"]),
            models.Index(fields=["visibility"]),
            models.Index(fields=["organization"]),
            ]

    def __str__(self):
        return f"{self.code} - {self.name}"


    def clean(self):
        if not self.name.strip():
            raise ValidationError(
        {"name": "Project name cannot be empty."}
    )
        if (
            self.start_date
            and self.end_date
            and self.start_date > self.end_date
        ):
            raise ValidationError(
                {
                    "end_date": "End date cannot be earlier than the start date."
                }
            )
    

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
        
    # def save(self, *args, **kwargs):
    #     if not self.code:
    #         from projects.services.project_code_service import generate_project_code
    #         self.code = generate_project_code()

    #     if not self.slug:
    #         self.slug = slugify(self.name.strip())

    #     self.full_clean()

    #     super().save(*args, **kwargs)


class ProjectMember(UUIDPrimaryKeyModel, TimeStampedModel):
    """
    Connects users to projects with specific roles.
    """

    # ==========================================================
    # Relationships
    # ==========================================================

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="members",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="project_memberships",
    )

    invited_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="project_invitations",
    )

    # ==========================================================
    # Membership
    # ==========================================================

    role = models.CharField(
        max_length=40,
        choices=ProjectRole.choices,
        default=ProjectRole.RESEARCHER,
    )

    is_active = models.BooleanField(
        default=True,
    )

    joined_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["project", "user"]

        constraints = [
        models.UniqueConstraint(
        fields=["project", "user"],
        name="unique_project_member",
        ),
        models.CheckConstraint(
        condition=Q(role__isnull=False),
        name="project_member_role_not_null",
    ),
]

    def __str__(self):
        return f"{self.user.email} - {self.project.code} ({self.role})"

