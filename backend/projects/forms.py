from django import forms

from projects.models import Project

# This prevents Admin from trying to collect the automatically generated fields.

class ProjectAdminForm(forms.ModelForm):
    class Meta:
        model = Project
        exclude = (
            "code",
            "slug",
        )