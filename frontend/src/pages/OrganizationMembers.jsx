import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getOrganization,
  getOrganizationMembers,
  getOrganizationRoles,
  createOrganizationMember,
  updateOrganizationMember,
} from "../services/organizationsApi";

import { getUsers } from "../services/userService";

function OrganizationMembers() {
  const { id } = useParams();

  const [organization, setOrganization] = useState(null);
  const [members, setMembers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  const [error, setError] = useState("");
  const [membersError, setMembersError] = useState("");
  const [rolesError, setRolesError] = useState("");

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [addingMember, setAddingMember] = useState(false);
  const [addMemberError, setAddMemberError] = useState("");
  const [addMemberSuccess, setAddMemberSuccess] = useState("");

  // Editing state
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editingRole, setEditingRole] = useState("");
  const [editingActive, setEditingActive] = useState(true);

  const [updatingMember, setUpdatingMember] = useState(false);
  const [updateMemberError, setUpdateMemberError] = useState("");
  const [updateMemberSuccess, setUpdateMemberSuccess] = useState("");

  // Load organization
  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const data = await getOrganization(id);
        setOrganization(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load organization.");
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [id]);

  // Load organization members
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getOrganizationMembers({
          organization: id,
        });

        setMembers(data.results || data);
      } catch (error) {
        console.error(error);
        setMembersError("Unable to load organization members.");
      } finally {
        setMembersLoading(false);
      }
    };

    loadMembers();
  }, [id]);

  // Load organization roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getOrganizationRoles();
        setRoles(data);
      } catch (error) {
        console.error(error);
        setRolesError("Unable to load organization roles.");
      } finally {
        setRolesLoading(false);
      }
    };

    loadRoles();
  }, []);

  // Load available users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data.results || data);
      } catch (error) {
        console.error(error);
        setUsersError("Unable to load users.");
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Add member
  const handleAddMember = async (event) => {
    event.preventDefault();

    setAddMemberError("");
    setAddMemberSuccess("");

    if (!selectedUser) {
      setAddMemberError("Please select a user.");
      return;
    }

    if (!selectedRole) {
      setAddMemberError("Please select a role.");
      return;
    }

    try {
      setAddingMember(true);

      const newMember = await createOrganizationMember({
        organization: id,
        user: selectedUser,
        role: selectedRole,
        is_active: true,
      });

      setMembers((currentMembers) => [...currentMembers, newMember]);

      setSelectedUser("");
      setSelectedRole("");

      setAddMemberSuccess("Member added successfully.");
    } catch (error) {
      console.error(error);

      const responseData = error.response?.data;

      if (responseData?.detail) {
        setAddMemberError(responseData.detail);
      } else if (responseData) {
        setAddMemberError(Object.values(responseData).flat().join(" "));
      } else {
        setAddMemberError("Unable to add organization member.");
      }
    } finally {
      setAddingMember(false);
    }
  };

  // Start editing a member
  const handleEditMember = (member) => {
    setEditingMemberId(member.id);
    setEditingRole(member.role);
    setEditingActive(member.is_active);

    setUpdateMemberError("");
    setUpdateMemberSuccess("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMemberId(null);
    setEditingRole("");
    setEditingActive(true);

    setUpdateMemberError("");
    setUpdateMemberSuccess("");
  };

  // Update member
  const handleUpdateMember = async (member) => {
    setUpdateMemberError("");
    setUpdateMemberSuccess("");

    if (!editingRole) {
      setUpdateMemberError("Please select a role.");
      return;
    }

    try {
      setUpdatingMember(true);

      const updatedMember = await updateOrganizationMember(member.id, {
        organization: id,
        user: member.user,
        role: editingRole,
        is_active: editingActive,
      });

      setMembers((currentMembers) =>
        currentMembers.map((currentMember) =>
          currentMember.id === member.id ? updatedMember : currentMember,
        ),
      );

      setEditingMemberId(null);
      setEditingRole("");
      setEditingActive(true);

      setUpdateMemberSuccess("Member updated successfully.");
    } catch (error) {
      console.error(error);

      console.log("UPDATE ERROR:", error.response?.data);

      const responseData = error.response?.data;

      if (responseData?.detail) {
        setUpdateMemberError(responseData.detail);
      } else if (responseData) {
        setUpdateMemberError(Object.values(responseData).flat().join(" "));
      } else {
        setUpdateMemberError("Unable to update organization member.");
      }
    } finally {
      setUpdatingMember(false);
    }
  };

  if (loading) {
    return <p>Loading organization...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!organization) {
    return <p>Organization not found.</p>;
  }

  /*
   * Only users who are not already members
   * should appear in the Add Member dropdown.
   */
  const availableUsers = users.filter(
    (user) => !members.some((member) => member.user === user.id),
  );

  /*
   * OWNER is intentionally excluded.
   *
   * The organization owner is created automatically
   * when the organization is created.
   */
  const memberRoles = roles.filter((role) => role.value !== "OWNER");

  return (
    <div>
      <Link to={`/organizations/${id}`}>← Back to Organization</Link>

      <h2>{organization.name} — Members</h2>

      <hr />

      {/* Available Roles */}
      <section>
        <h3>Available Roles</h3>

        {rolesLoading && <p>Loading roles...</p>}

        {rolesError && <p>{rolesError}</p>}

        {!rolesLoading && !rolesError && roles.length > 0 && (
          <ul>
            {roles.map((role) => (
              <li key={role.value}>{role.label}</li>
            ))}
          </ul>
        )}
      </section>

      <hr />

      {/* Add Member */}
      <section>
        <h3>Add Member</h3>

        {usersLoading && <p>Loading users...</p>}

        {usersError && <p>{usersError}</p>}

        {addMemberError && <p>{addMemberError}</p>}

        {addMemberSuccess && <p>{addMemberSuccess}</p>}

        {!usersLoading && !usersError && !rolesLoading && !rolesError && (
          <form onSubmit={handleAddMember}>
            <div>
              <label htmlFor="member-user">User</label>

              <br />

              <select
                id="member-user"
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
              >
                <option value="">Select a user</option>

                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} — {user.email}
                  </option>
                ))}
              </select>
            </div>

            <br />

            <div>
              <label htmlFor="member-role">Role</label>

              <br />

              <select
                id="member-role"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <option value="">Select a role</option>

                {memberRoles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <br />

            <button type="submit" disabled={addingMember}>
              {addingMember ? "Adding..." : "Add Member"}
            </button>
          </form>
        )}
      </section>

      <hr />

      {/* Members */}
      <section>
        <h3>Members</h3>

        {membersLoading && <p>Loading members...</p>}

        {membersError && <p>{membersError}</p>}

        {updateMemberError && <p>{updateMemberError}</p>}

        {updateMemberSuccess && <p>{updateMemberSuccess}</p>}

        {!membersLoading && !membersError && members.length === 0 && (
          <p>No members found.</p>
        )}

        {!membersLoading && !membersError && members.length > 0 && (
          <div>
            {members.map((member) => (
              <article key={member.id}>
                {editingMemberId === member.id ? (
                  <>
                    <p>
                      <strong>Name:</strong> {member.user_name || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {member.user_email || "N/A"}
                    </p>
                    <div>
                      <label htmlFor={`role-${member.id}`}>Role</label>

                      <br />

                      <select
                        id={`role-${member.id}`}
                        value={editingRole}
                        onChange={(event) => setEditingRole(event.target.value)}
                      >
                        <option value="">Select a role</option>

                        {memberRoles.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <br />
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={editingActive}
                          onChange={(event) =>
                            setEditingActive(event.target.checked)
                          }
                        />{" "}
                        {editingActive ? "Active" : "Inactive"}
                      </label>
                    </div>
                    <br />
                    <button
                      type="button"
                      onClick={() => handleUpdateMember(member)}
                      disabled={updatingMember}
                    >
                      {updatingMember ? "Saving..." : "Save"}
                    </button>{" "}
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      disabled={updatingMember}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Name:</strong> {member.user_name || "N/A"}
                    </p>

                    <p>
                      <strong>Email:</strong> {member.user_email || "N/A"}
                    </p>

                    <p>
                      <strong>Role:</strong> {member.role}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      <button
                        type="button"
                        onClick={() => {
                          if (member.role === "OWNER") {
                            return;
                          }

                          setEditingMemberId(member.id);
                          setEditingRole(member.role);
                          setEditingActive(!member.is_active);

                          setUpdateMemberError("");
                          setUpdateMemberSuccess("");
                        }}
                        disabled={member.role === "OWNER"}
                      >
                        {member.is_active ? "Active" : "Inactive"}
                      </button>
                    </p>

                    {member.role === "OWNER" ? (
                      <p>
                        <em>
                          Organization owner cannot be removed or have their
                          role changed.
                        </em>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEditMember(member)}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}

                <hr />
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default OrganizationMembers;
