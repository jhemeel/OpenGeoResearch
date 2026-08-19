from django.contrib import admin

from .models import Membership, Organization


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "organization_type",
        "country",
        "city",
        "is_active",
        "created_at",
    )

    list_filter = (
        "organization_type",
        "country",
        "is_active",
    )

    search_fields = (
        "name",
        "short_name",
        "email",
        "country",
        "city",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )

    ordering = ("name",)


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "organization",
        "role",
        "is_active",
        "joined_at",
    )

    list_filter = (
        "role",
        "is_active",
    )

    search_fields = (
        "user__email",
        "organization__name",
    )

    readonly_fields = (
        "id",
        "joined_at",
        "created_at",
        "updated_at",
    )

    ordering = (
        "organization",
        "user",
    )