import api from "./api";

export const getProjectMembers = async (projectId) => {
  const response = await api.get(
    "project-members/",
    {
      params: {
        project: projectId,
      },
    }
  );

  return response.data;
};

export const createProjectMember = async (
  memberData
) => {
  const response = await api.post(
    "project-members/",
    memberData
  );

  return response.data;
};

export const updateProjectMember = async (
  memberId,
  memberData
) => {
  const response = await api.patch(
    `project-members/${memberId}/`,
    memberData
  );

  return response.data;
};

export const deleteProjectMember = async (
  memberId
) => {
  await api.delete(
    `project-members/${memberId}/`
  );
};