import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getProject,
  deleteProject,
} from "../services/projectService";

import {
  getProjectMembers,
  createProjectMember,
  updateProjectMember,
  deleteProjectMember,
} from "../services/projectMemberService";

import { getUsers } from "../services/userService";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import Select from "../components/ui/Select";
import StatusBadge from "../components/ui/StatusBadge";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState("");

  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingMemberRole, setEditingMemberRole] = useState("");
  const [updatingMember, setUpdatingMember] = useState(false);

  const [users, setUsers] = useState([]);
  const [showAddMember, setShowAddMember] = useState(false);

  const [memberForm, setMemberForm] = useState({
    user: "",
    role: "RESEARCHER",
  });

  const [addingMember, setAddingMember] = useState(false);
  const [memberFormError, setMemberFormError] = useState("");

  const roleOptions = [
    { value: "OWNER", label: "Owner" },
    {
      value: "PRINCIPAL_INVESTIGATOR",
      label: "Principal Investigator",
    },
    {
      value: "PROJECT_MANAGER",
      label: "Project Manager",
    },
    {
      value: "DATA_MANAGER",
      label: "Data Manager",
    },
    { value: "RESEARCHER", label: "Researcher" },
    { value: "ENUMERATOR", label: "Enumerator" },
    { value: "ANALYST", label: "Data Analyst" },
    { value: "VIEWER", label: "Viewer" },
  ];

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        const [projectData, membersData, usersData] =
          await Promise.all([
            getProject(id),
            getProjectMembers(id),
            getUsers(),
          ]);

        setProject(projectData);

        setMembers(
          membersData.results || membersData
        );

        setUsers(
          usersData.results || usersData
        );
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load the project. Please try again."
        );
      } finally {
        setLoading(false);
        setMembersLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleMemberChange = (event) => {
    const { name, value } = event.target;

    setMemberForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAddMember = async (event) => {
    event.preventDefault();

    if (!memberForm.user) {
      setMemberFormError("Please select a user.");
      return;
    }

    try {
      setAddingMember(true);
      setMemberFormError("");

      const newMember = await createProjectMember(id, {
        user: memberForm.user,
        role: memberForm.role,
      });

      setMembers((current) => [
        ...current,
        newMember,
      ]);

      setMemberForm({
        user: "",
        role: "RESEARCHER",
      });

      setShowAddMember(false);
    } catch (error) {
      console.error(error);

      setMemberFormError(
        error?.response?.data?.detail ||
          "Unable to add project member."
      );
    } finally {
      setAddingMember(false);
    }
  };

  const handleEditMember = (member) => {
    setEditingMemberId(member.id);
    setEditingMemberRole(member.role);
  };

  const handleUpdateMember = async (memberId) => {
    try {
      setUpdatingMember(true);

      const updatedMember = await updateProjectMember(
        id,
        memberId,
        {
          role: editingMemberRole,
        }
      );

      setMembers((current) =>
        current.map((member) =>
          member.id === memberId
            ? updatedMember
            : member
        )
      );

      setEditingMemberId(null);
      setEditingMemberRole("");
    } catch (error) {
      console.error(error);

      setMembersError(
        "Unable to update project member."
      );
    } finally {
      setUpdatingMember(false);
    }
  };

  const handleCancelEditMember = () => {
    setEditingMemberId(null);
    setEditingMemberRole("");
  };

  const handleToggleMemberStatus = async (member) => {
    try {
      const updatedMember = await updateProjectMember(
        id,
        member.id,
        {
          is_active: !member.is_active,
        }
      );

      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? updatedMember
            : item
        )
      );
    } catch (error) {
      console.error(error);

      setMembersError(
        "Unable to update member status."
      );
    }
  };

  const handleRemoveMember = async (memberId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member from the project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProjectMember(id, memberId);

      setMembers((current) =>
        current.filter(
          (member) => member.id !== memberId
        )
      );
    } catch (error) {
      console.error(error);

      setMembersError(
        "Unable to remove project member."
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(id);
      navigate("/projects");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to delete the project. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Project Details"
          description="Loading project information..."
        />

        <Card>
          <div className="space-y-4">
            <div className="h-7 w-2/3 animate-pulse rounded bg-ogr-slate-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-ogr-slate-200" />
            <div className="h-24 animate-pulse rounded bg-ogr-slate-200" />
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Project Details"
          description="Research project information"
          backLink={
            <Link
              to="/projects"
              className="text-sm font-medium text-ogr-primary-600 hover:text-ogr-primary-700"
            >
              ← Back to Projects
            </Link>
          }
        />

        <Card title="Unable to load project">
          <p className="text-sm text-ogr-danger">
            {error}
          </p>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Project Details"
          description="Research project information"
          backLink={
            <Link
              to="/projects"
              className="text-sm font-medium text-ogr-primary-600 hover:text-ogr-primary-700"
            >
              ← Back to Projects
            </Link>
          }
        />

        <Card>
          <div className="py-8 text-center">
            <p className="font-medium text-ogr-slate-800">
              Project not found.
            </p>

            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => navigate("/projects")}
              >
                Back to Projects
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={project.name}
        description="Research project details and project team management."
        backLink={
          <Link
            to="/projects"
            className="text-sm font-medium text-ogr-primary-600 hover:text-ogr-primary-700"
          >
            ← Back to Projects
          </Link>
        }
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              onClick={() =>
                navigate(`/projects/${project.id}/edit`)
              }
            >
              Edit Project
            </Button>

            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </div>
        }
      />

      {/* Project Summary */}
      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-ogr-md bg-ogr-primary-50 px-3 py-1 text-sm font-semibold text-ogr-primary-700">
                {project.code}
              </span>

              <StatusBadge status={project.status} />

              <StatusBadge
                status={
                  project.visibility === "PUBLIC"
                    ? "PUBLIC"
                    : "PRIVATE"
                }
              />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-ogr-slate-900">
              {project.name}
            </h2>

            {project.slug && (
              <p className="mt-1 text-sm text-ogr-slate-500">
                {project.slug}
              </p>
            )}
          </div>

          <div className="shrink-0">
            <StatusBadge
              status={
                project.is_active
                  ? "ACTIVE"
                  : "INACTIVE"
              }
            />
          </div>
        </div>
      </Card>

      {/* Overview + Information */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Project Overview"
          description="Description and objectives of the research project."
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-ogr-slate-900">
                Description
              </h4>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ogr-slate-600">
                {project.description ||
                  "No description provided."}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-ogr-slate-900">
                Objectives
              </h4>

              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ogr-slate-600">
                {project.objectives ||
                  "No objectives provided."}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-ogr-slate-900">
                Keywords
              </h4>

              <p className="mt-2 text-sm text-ogr-slate-600">
                {project.keywords ||
                  "No keywords provided."}
              </p>
            </div>
          </div>
        </Card>

        <Card
          title="Project Information"
          description="Key project details."
        >
          <dl className="space-y-5">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
                Organization
              </dt>

              <dd className="mt-1 text-sm font-medium text-ogr-slate-900">
                {project.organization_name ||
                  project.organization ||
                  "Not specified"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
                Owner
              </dt>

              <dd className="mt-1 text-sm font-medium text-ogr-slate-900">
                {project.owner_name ||
                  project.owner ||
                  "Not specified"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
                Principal Investigator
              </dt>

              <dd className="mt-1 text-sm font-medium text-ogr-slate-900">
                {project.principal_investigator_name ||
                  project.principal_investigator ||
                  "Not specified"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
                Start Date
              </dt>

              <dd className="mt-1 text-sm text-ogr-slate-700">
                {project.start_date ||
                  "Not specified"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
                End Date
              </dt>

              <dd className="mt-1 text-sm text-ogr-slate-700">
                {project.end_date ||
                  "Not specified"}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
                Active
              </dt>

              <dd className="mt-1">
                <StatusBadge
                  status={
                    project.is_active
                      ? "ACTIVE"
                      : "INACTIVE"
                  }
                />
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* Funding & Compliance */}
      <Card
        title="Funding & Compliance"
        description="Financial and research governance information."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
              Funding Agency
            </p>

            <p className="mt-1 text-sm font-medium text-ogr-slate-900">
              {project.funding_agency ||
                "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
              Grant Number
            </p>

            <p className="mt-1 text-sm font-medium text-ogr-slate-900">
              {project.grant_number ||
                "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
              Budget
            </p>

            <p className="mt-1 text-sm font-medium text-ogr-slate-900">
              {project.budget !== null &&
              project.budget !== undefined
                ? project.budget
                : "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ogr-slate-500">
              Ethics Approval
            </p>

            <p className="mt-1 text-sm font-medium text-ogr-slate-900">
              {project.ethics_approval_number ||
                "Not specified"}
            </p>
          </div>
        </div>
      </Card>

      {/* Project Members */}
      <Card
        title="Project Members"
        description="Manage researchers and collaborators assigned to this project."
        actions={
          <Button
            variant="primary"
            onClick={() => {
              setShowAddMember((current) => !current);
              setMemberFormError("");
            }}
          >
            {showAddMember
              ? "Cancel"
              : "Add Member"}
          </Button>
        }
      >
        {/* Add Member Form */}
        {showAddMember && (
          <div className="mb-6 rounded-ogr-md border border-ogr-slate-200 bg-ogr-slate-50 p-5">
            <h4 className="text-sm font-semibold text-ogr-slate-900">
              Add Project Member
            </h4>

            <form
              onSubmit={handleAddMember}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="User"
                  name="user"
                  value={memberForm.user}
                  onChange={handleMemberChange}
                  options={[
                    {
                      value: "",
                      label: "Select user",
                    },
                    ...users.map((user) => ({
                      value: user.id,
                      label:
                        user.display_name ||
                        user.full_name ||
                        user.email,
                    })),
                  ]}
                />

                <Select
                  label="Role"
                  name="role"
                  value={memberForm.role}
                  onChange={handleMemberChange}
                  options={roleOptions}
                />
              </div>

              {memberFormError && (
                <p className="text-sm text-ogr-danger">
                  {memberFormError}
                </p>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={addingMember}
                >
                  {addingMember
                    ? "Adding..."
                    : "Add Member"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {membersError && (
          <div className="mb-5 rounded-ogr-md border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-ogr-danger">
              {membersError}
            </p>
          </div>
        )}

        {/* Members List */}
        {membersLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-16 animate-pulse rounded-ogr-md bg-ogr-slate-100"
              />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="py-10 text-center">
            <p className="font-medium text-ogr-slate-800">
              No project members found.
            </p>

            <p className="mt-1 text-sm text-ogr-slate-500">
              Add researchers and collaborators to
              this project.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-ogr-slate-100">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ogr-primary-100 text-sm font-semibold text-ogr-primary-700">
                    {(
                      member.user_name ||
                      member.user_email ||
                      "U"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ogr-slate-900">
                      {member.user_name ||
                        "Unnamed user"}
                    </p>

                    {member.user_email && (
                      <p className="truncate text-xs text-ogr-slate-500">
                        {member.user_email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {editingMemberId === member.id ? (
                    <>
                      <Select
                        value={editingMemberRole}
                        onChange={(event) =>
                          setEditingMemberRole(
                            event.target.value
                          )
                        }
                        options={roleOptions}
                      />

                      <Button
                        variant="primary"
                        onClick={() =>
                          handleUpdateMember(
                            member.id
                          )
                        }
                        disabled={updatingMember}
                      >
                        {updatingMember
                          ? "Saving..."
                          : "Save"}
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={
                          handleCancelEditMember
                        }
                        disabled={updatingMember}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex rounded-ogr-md bg-ogr-slate-100 px-3 py-1 text-xs font-medium text-ogr-slate-700">
                        {member.role}
                      </span>

                      <StatusBadge
                        status={
                          member.is_active
                            ? "ACTIVE"
                            : "INACTIVE"
                        }
                      />

                      {member.user !== project.owner && (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleEditMember(
                                member
                              )
                            }
                          >
                            Edit
                          </Button>

                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleToggleMemberStatus(
                                member
                              )
                            }
                          >
                            {member.is_active
                              ? "Deactivate"
                              : "Activate"}
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() =>
                              handleRemoveMember(
                                member.id
                              )
                            }
                          >
                            Remove
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default ProjectDetails;