from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import (
    Project,
    ProjectMember,
    ProjectSequence,
)


class ProjectMemberInline(admin.TabularInline):
    """
    Inline administration for project members.
    """

    model = ProjectMember
    extra = 0

    fields = (
        "user",
        "role",
        "is_active",
        "joined_at",
    )

    readonly_fields = (
        "joined_at",
    )

    autocomplete_fields = (
        "user",
    )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin configuration for Project.
    """

    list_display = (
        "code",
        "name",
        "organization",
        "owner",
        "status",
        "visibility",
        "is_active",
        "created_at",
    )

    list_filter = (
        "status",
        "visibility",
        "is_active",
        "organization",
        "created_at",
    )

    search_fields = (
        "code",
        "name",
        "description",
        "keywords",
        "funding_agency",
        "grant_number",
        "owner__email",
        "organization__name",
    )

    readonly_fields = (
        "id",
        "code",
        "slug",
        "created_at",
        "updated_at",
    )

    autocomplete_fields = (
        "organization",
        "owner",
        "principal_investigator",
    )

    list_select_related = (
        "organization",
        "owner",
        "principal_investigator",
    )

    inlines = [
        ProjectMemberInline,
    ]

    fieldsets = (
    (
        "Identity",
        {
            "fields": (
                "code",
                "name",
                "slug",
            )
        },
    ),
    (
        "Ownership",
        {
            "fields": (
                "organization",
                "owner",
                "principal_investigator",
            )
        },
    ),
    (
        "Research",
        {
            "fields": (
                "description",
                "objectives",
                "keywords",
            )
        },
    ),
    (
        "Funding",
        {
            "fields": (
                "funding_agency",
                "grant_number",
                "budget",
                "ethics_approval_number",
            )
        },
    ),
    (
        "Timeline",
        {
            "fields": (
                "start_date",
                "end_date",
            )
        },
    ),
    (
        "Status",
        {
            "fields": (
                "status",
                "visibility",
                "is_active",
            )
        },
    ),
    (
        "Audit",
        {
            "fields": (
                "id",
                "created_at",
                "updated_at",
            )
        },
    ),
)
    

@admin.register(ProjectMember)
class ProjectMemberAdmin(admin.ModelAdmin):
    """
    Admin configuration for ProjectMember.
    """

    list_display = (
        "project",
        "user",
        "role",
        "is_active",
        "joined_at",
    )

    list_filter = (
        "role",
        "is_active",
        "joined_at",
    )

    search_fields = (
        "project__code",
        "project__name",
        "user__email",
        "user__first_name",
        "user__last_name",
    )

    autocomplete_fields = (
        "project",
        "user",
        "invited_by",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "joined_at",
    )

    list_select_related = (
        "project",
        "user",
        "invited_by",
    )

    fieldsets = (
        (
            "Membership",
            {
                "fields": (
                    "project",
                    "user",
                    "role",
                    "is_active",
                )
            },
        ),
        (
            "Invitation",
            {
                "fields": (
                    "invited_by",
                    "joined_at",
                )
            },
        ),
        (
            "Audit",
            {
                "fields": (
                    "id",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )



@admin.register(ProjectSequence)
class ProjectSequenceAdmin(admin.ModelAdmin):
    """
    Admin configuration for ProjectSequence.
    """

    list_display = (
        "year",
        "last_number",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "year",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )

    ordering = (
        "-year",
    )

    fieldsets = (
        (
            "Sequence",
            {
                "fields": (
                    "year",
                    "last_number",
                )
            },
        ),
        (
            "Audit",
            {
                "fields": (
                    "id",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )