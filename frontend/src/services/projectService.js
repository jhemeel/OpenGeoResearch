import api from "./api";

export const getProjects = async (params = {}) => {
  const response = await api.get("projects/", {
    params,
  });

  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(
    `projects/${projectId}/`
  );

  return response.data;
};

export const createProject = async (projectData) => {
  const response = await api.post(
    "projects/",
    projectData
  );

  return response.data;
};

export const updateProject = async (
  projectId,
  projectData
) => {
  const response = await api.put(
    `projects/${projectId}/`,
    projectData
  );

  return response.data;
};

export const deleteProject = async (projectId) => {
  await api.delete(
    `projects/${projectId}/`
  );
};