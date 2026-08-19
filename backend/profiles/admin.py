from django.contrib import admin
from .models import UserProfile, ResearcherProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "country", "city", "profile_visibility", "created_at")
    search_fields = ("user__email", "user__first_name", "user__last_name", "country", "city")
    list_filter = ("profile_visibility", "country")
    ordering = ("user__email",)


@admin.register(ResearcherProfile)
class ResearcherProfileAdmin(admin.ModelAdmin):
    list_display = ("profile", "institution", "job_title", "years_of_experience", "created_at")
    search_fields = (
        "profile__user__email",
        "institution",
        "department",
        "orcid",
    )
    list_filter = ("institution", "faculty")
    ordering = ("profile__user__email",)


