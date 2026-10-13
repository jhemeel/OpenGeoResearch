import api from "./api";

export const getOrganizations = async (params = {}) => {
  const response = await api.get("organizations/", {
    params,
  });

  return response.data;
};

export const getOrganization = async (organizationId) => {
  const response = await api.get(
    `organizations/${organizationId}/`
  );

  return response.data;
};

export const createOrganization = async (organizationData) => {
  const response = await api.post(
    "organizations/",
    organizationData
  );

  return response.data;
};

export const updateOrganization = async (
  organizationId,
  organizationData
) => {
  const response = await api.put(
    `organizations/${organizationId}/`,
    organizationData
  );

  return response.data;
};

export const deleteOrganization = async (organizationId) => {
  const response = await api.delete(
    `organizations/${organizationId}/`
  );

  return response.data;
};

export const getOrganizationMembers = async (
  params = {}
) => {
  const response = await api.get(
    "organization-memberships/",
    {
      params,
    }
  );

  return response.data;
};

export const getOrganizationMember = async (
  membershipId
) => {
  const response = await api.get(
    `organization-memberships/${membershipId}/`
  );

  return response.data;
};

export const createOrganizationMember = async (
  membershipData
) => {
  const response = await api.post(
    "organization-memberships/",
    membershipData
  );

  return response.data;
};

export const updateOrganizationMember = async (
  membershipId,
  membershipData
) => {
  const response = await api.put(
    `organization-memberships/${membershipId}/`,
    membershipData
  );

  return response.data;
};

export const deleteOrganizationMember = async (
  membershipId
) => {
  const response = await api.delete(
    `organization-memberships/${membershipId}/`
  );

  return response.data;
};

export const getOrganizationTypes = async () => {
  const response = await api.get(
    "organizations/types/"
  );

  return response.data;
};

export const getOrganizationRoles = async () => {
  const response = await api.get(
    "organizations/roles/"
  );

  return response.data;
};

export const getOrganizationProjects = async (organizationId) => {
  const response = await api.get(
    `/projects/?organization=${organizationId}`
  );
  return response.data;
};