import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getProject, deleteProject,} from "../services/projectService";
import { getProjectMembers, createProjectMember, updateProjectMember,} from "../services/projectMemberService";
import { getUsers } from "../services/userService";


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

  const [showAddMember, setShowAddMember] =  useState(false);

  const [memberForm, setMemberForm] = useState({
    user: "",
    role: "RESEARCHER",
  });

  const [addingMember, setAddingMember] =
    useState(false);

  const [memberFormError, setMemberFormError] =
    useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const [
          projectData,
          memberData,
          userData,
        ] = await Promise.all([
          getProject(id),
          getProjectMembers(id),
          getUsers(),
        ]);

        setProject(projectData);

        setMembers(
          memberData.results || memberData
        );

        setUsers(
          userData.results || userData
        );
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load project."
        );

        setMembersError(
          "Unable to load project members."
        );
      } finally {
        setLoading(false);
        setMembersLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleMemberChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setMemberForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddMember = async (event) => {
    event.preventDefault();

    setAddingMember(true);
    setMemberFormError("");

    try {
      await createProjectMember({
        project: id,
        user: memberForm.user,
        role: memberForm.role,
      });

      const updatedMembers =
        await getProjectMembers(id);

      setMembers(
        updatedMembers.results ||
          updatedMembers
      );

      setMemberForm({
        user: "",
        role: "RESEARCHER",
      });

      setShowAddMember(false);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setMemberFormError(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        setMemberFormError(
          "Unable to add project member."
        );
      }
    } finally {
      setAddingMember(false);
    }
  };

  const handleEditMember = (member) => {
    setEditingMemberId(member.id);
    setEditingMemberRole(member.role);
};

  const handleUpdateMember = async (memberId) => {
    setUpdatingMember(true);
    setMembersError("");

    try {
      await updateProjectMember(
        memberId,
        {
          role: editingMemberRole,
        }
      );

      const updatedMembers =
        await getProjectMembers(id);

      setMembers(
        updatedMembers.results ||
          updatedMembers
      );

      setEditingMemberId(null);
      setEditingMemberRole("");
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setMembersError(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        setMembersError(
          "Unable to update project member."
        );
      }
    } finally {
      setUpdatingMember(false);
    }
};

  const handleCancelEditMember = () => {
    setEditingMemberId(null);
    setEditingMemberRole("");
};


  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
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
        "Unable to delete project."
      );
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error && !project) {
    return (
      <div>
        <p>{error}</p>

        <button
          type="button"
          onClick={() =>
            navigate("/projects")
          }
        >
          Back to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          navigate("/projects")
        }
      >
        ← Back to Projects
      </button>

      <h2>{project.name}</h2>

      {error && (
        <div>
          <strong>Error:</strong>
          <p>{error}</p>
        </div>
      )}

      <hr />

      <section>
        <h3>Project Overview</h3>

        <p>
          <strong>Code:</strong>{" "}
          {project.code}
        </p>

        <p>
          <strong>Organization:</strong>{" "}
          {project.organization_name ||
            project.organization}
        </p>

        <p>
          <strong>Owner:</strong>{" "}
          {project.owner_name ||
            project.owner}
        </p>

        <p>
          <strong>
            Principal Investigator:
          </strong>{" "}
          {project.principal_investigator_name ||
            project.principal_investigator ||
            "Not specified"}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {project.description ||
            "No description provided."}
        </p>

        <p>
          <strong>Objectives:</strong>{" "}
          {project.objectives ||
            "No objectives provided."}
        </p>

        <p>
          <strong>Keywords:</strong>{" "}
          {project.keywords ||
            "No keywords provided."}
        </p>

        <p>
          <strong>Funding Agency:</strong>{" "}
          {project.funding_agency ||
            "Not specified"}
        </p>

        <p>
          <strong>Grant Number:</strong>{" "}
          {project.grant_number ||
            "Not specified"}
        </p>

        <p>
          <strong>Budget:</strong>{" "}
          {project.budget ??
            "Not specified"}
        </p>

        <p>
          <strong>
            Ethics Approval Number:
          </strong>{" "}
          {project.ethics_approval_number ||
            "Not specified"}
        </p>

        <p>
          <strong>Start Date:</strong>{" "}
          {project.start_date ||
            "Not specified"}
        </p>

        <p>
          <strong>End Date:</strong>{" "}
          {project.end_date ||
            "Not specified"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {project.status}
        </p>

        <p>
          <strong>Visibility:</strong>{" "}
          {project.visibility}
        </p>

        <p>
          <strong>Active:</strong>{" "}
          {project.is_active
            ? "Yes"
            : "No"}
        </p>
      </section>

      <hr />

      <section>
        <h3>Project Members</h3>

        <button
          type="button"
          onClick={() => {
            setShowAddMember(
              (previous) => !previous
            );

            setMemberFormError("");
          }}
        >
          {showAddMember
            ? "Cancel"
            : "+ Add Member"}
        </button>

        {showAddMember && (
          <form
            onSubmit={handleAddMember}
            style={{
              marginTop: "16px",
              marginBottom: "24px",
            }}
          >
            <div>
              <label htmlFor="member-user">
                User
              </label>

              <br />

              <select
                id="member-user"
                name="user"
                value={memberForm.user}
                onChange={handleMemberChange}
                required
              >
                <option value="">
                  Select user
                </option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name ||
                      user.email}{" "}
                    ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <br />

            <div>
              <label htmlFor="member-role">
                Role
              </label>

              <br />

              <select
                id="member-role"
                name="role"
                value={memberForm.role}
                onChange={handleMemberChange}
                required
              >
                <option value="OWNER">
                  Owner
                </option>

                <option value="PRINCIPAL_INVESTIGATOR">
                  Principal Investigator
                </option>

                <option value="PROJECT_MANAGER">
                  Project Manager
                </option>

                <option value="DATA_MANAGER">
                  Data Manager
                </option>

                <option value="RESEARCHER">
                  Researcher
                </option>

                <option value="ENUMERATOR">
                  Enumerator
                </option>

                <option value="ANALYST">
                  Analyst
                </option>

                <option value="VIEWER">
                  Viewer
                </option>
              </select>
            </div>

            <br />

            {memberFormError && (
              <div>
                <strong>Error:</strong>

                <pre>
                  {memberFormError}
                </pre>
              </div>
            )}

            <button
              type="submit"
              disabled={addingMember}
            >
              {addingMember
                ? "Adding..."
                : "Add Member"}
            </button>
          </form>
        )}

        <div style={{ marginTop: "20px" }}>
          {membersLoading && (
            <p>Loading members...</p>
          )}

          {membersError && (
            <p>{membersError}</p>
          )}

          {!membersLoading &&
            !membersError &&
            members.length === 0 && (
              <p>
                No members found.
              </p>
            )}

          {!membersLoading &&
            members.length > 0 && (
              <div>
                {members.map((member) => (
            <div
              key={member.id}
              style={{
                marginBottom: "16px",
                paddingBottom: "12px",
                borderBottom:
                  "1px solid #ddd",
              }}
            >
              <p>
                <strong>
                  {member.user_name ||
                    "Unnamed user"}
                </strong>
              </p>

              <p>
                {member.user_email}
              </p>

              {editingMemberId === member.id ? (
                <div>
                  <label
                    htmlFor={`role-${member.id}`}
                  >
                    Role
                  </label>

                  <br />

                  <select
                    id={`role-${member.id}`}
                    value={editingMemberRole}
                    onChange={(event) =>
                      setEditingMemberRole(
                        event.target.value
                      )
                    }
                  >
                    <option value="OWNER">
                      Owner
                    </option>

                    <option value="PRINCIPAL_INVESTIGATOR">
                      Principal Investigator
                    </option>

                    <option value="PROJECT_MANAGER">
                      Project Manager
                    </option>

                    <option value="DATA_MANAGER">
                      Data Manager
                    </option>

                    <option value="RESEARCHER">
                      Researcher
                    </option>

                    <option value="ENUMERATOR">
                      Enumerator
                    </option>

                    <option value="ANALYST">
                      Analyst
                    </option>

                    <option value="VIEWER">
                      Viewer
                    </option>
                  </select>

                  <br />
                  <br />

                  <button
                    type="button"
                    disabled={updatingMember}
                    onClick={() =>
                      handleUpdateMember(
                        member.id
                      )
                    }
                  >
                    {updatingMember
                      ? "Saving..."
                      : "Save"}
                  </button>

                  {" "}

                  <button
                    type="button"
                    disabled={updatingMember}
                    onClick={
                      handleCancelEditMember
                    }
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p>
                    <strong>
                      Role:
                    </strong>{" "}
                    {member.role}
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {member.is_active
                      ? "Active"
                      : "Inactive"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleEditMember(
                        member
                      )
                    }
                  >
                    Edit Role
                  </button>
                </>
              )}
            </div>
              ))}
              </div>
            )}
        </div>
      </section>

      <hr />

      <section>
        <button
          type="button"
          onClick={() =>
            navigate(
              `/projects/${id}/edit`
            )
          }
        >
          Edit Project
        </button>

        {" "}

        <button
          type="button"
          onClick={handleDelete}
        >
          Delete Project
        </button>
      </section>
    </div>
  );
}

export default ProjectDetails;