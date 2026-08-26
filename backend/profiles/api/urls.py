from django.urls import path

from .views import (
    MyProfileView,
    ResearcherListView,
)

urlpatterns = [
    path(
        "me/",
        MyProfileView.as_view(),
        name="my-profile",
    ),

    path(
        "researchers/",
        ResearcherListView.as_view(),
        name="researcher-list",
    ),
]