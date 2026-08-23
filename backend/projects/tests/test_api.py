from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase

from organizations.models import Organization
from projects.models import Project, ProjectMember


User = get_user_model()


class ProjectAPITests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="apiowner@example.com",
            password="TestPassword123!",
        )

        self.organization = Organization.objects.create(
            name="API Test Organization",
        )

        self.client.force_authenticate(
            user=self.user,
        )

    def test_create_project(self):
        url = reverse("project-list")

        data = {
            "name": "API Test Project",
            "organization": str(self.organization.id),
            "owner": str(self.user.id),
            "description": "Project created through the API.",
        }

        response = self.client.post(
            url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            201,
        )

        self.assertEqual(
            Project.objects.count(),
            1,
        )

        project = Project.objects.get()

        self.assertEqual(
            project.name,
            "API Test Project",
        )

        self.assertTrue(project.code)

        self.assertTrue(
            ProjectMember.objects.filter(
                project=project,
                user=self.user,
            ).exists()
        )


    def test_non_owner_cannot_update_project(self):
        other_user = User.objects.create_user(
            email="other@example.com",
            password="TestPassword123!",
        )

        project = Project.objects.create(
            code="OGR-TEST-0001",
            name="Protected Project",
            slug="protected-project",
            organization=self.organization,
            owner=other_user,
        )

        url = reverse(
            "project-detail",
            kwargs={"pk": project.pk},
        )

        data = {
            "name": "Unauthorized Update",
            "organization": str(self.organization.id),
            "owner": str(other_user.id),
            "description": "This should not be allowed.",
        }

        response = self.client.put(
            url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            403,
        )

        project.refresh_from_db()

        self.assertEqual(
            project.name,
            "Protected Project",
        )

    def test_non_owner_cannot_delete_project(self):
        other_user = User.objects.create_user(
            email="delete-owner@example.com",
            password="TestPassword123!",
        )

        project = Project.objects.create(
            code="OGR-TEST-0002",
            name="Protected Delete Project",
            slug="protected-delete-project",
            organization=self.organization,
            owner=other_user,
        )

        url = reverse(
            "project-detail",
            kwargs={"pk": project.pk},
        )

        response = self.client.delete(url)

        self.assertEqual(
            response.status_code,
            403,
        )

        self.assertTrue(
            Project.objects.filter(pk=project.pk).exists()
        )

class ProjectMemberAPITests(APITestCase):

    def setUp(self):
        self.owner = User.objects.create_user(
            email="memberowner@example.com",
            password="TestPassword123!",
        )

        self.other_user = User.objects.create_user(
            email="member@example.com",
            password="TestPassword123!",
        )

        self.organization = Organization.objects.create(
            name="Membership API Organization",
        )

        self.project = Project.objects.create(
            code="OGR-TEST-MEMBER-0001",
            name="Membership API Project",
            slug="membership-api-project",
            organization=self.organization,
            owner=self.owner,
        )

        self.client.force_authenticate(
            user=self.owner,
        )

    def test_owner_can_create_project_member(self):
        url = reverse("project-member-list")

        data = {
            "project": str(self.project.id),
            "user": str(self.other_user.id),
            "role": "RESEARCHER",
            "is_active": True,
        }

        response = self.client.post(
            url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            201,
        )

        self.assertTrue(
            ProjectMember.objects.filter(
                project=self.project,
                user=self.other_user,
                role="RESEARCHER",
            ).exists()
        )

    def test_non_owner_cannot_update_project_member(self):
        membership = ProjectMember.objects.create(
            project=self.project,
            user=self.other_user,
            role="RESEARCHER",
        )

        another_user = User.objects.create_user(
            email="another@example.com",
            password="TestPassword123!",
        )

        self.client.force_authenticate(
            user=another_user,
        )

        url = reverse(
            "project-member-detail",
            kwargs={"pk": membership.pk},
        )

        data = {
            "project": str(self.project.id),
            "user": str(self.other_user.id),
            "role": "DATA_MANAGER",
            "is_active": True,
        }

        response = self.client.put(
            url,
            data,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            404,
        )

        membership.refresh_from_db()

        self.assertEqual(
            membership.role,
            "RESEARCHER",
        )