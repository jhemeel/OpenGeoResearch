import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getOrganization,
  updateOrganization,
} from "../services/organizationsApi";

function OrganizationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    organization_type: "",
    description: "",
    website: "",
    email: "",
    phone_number: "",
    logo: null,
    country: "",
    state: "",
    city: "",
    is_active: true,
  });

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const data = await getOrganization(id);

        setFormData({
          name: data.name || "",
          short_name: data.short_name || "",
          organization_type:
            data.organization_type || "",
          description: data.description || "",
          website: data.website || "",
          email: data.email || "",
          phone_number:
            data.phone_number || "",
          logo: null,
          country: data.country || "",
          state: data.state || "",
          city: data.city || "",
          is_active:
            data.is_active ?? true,
        });
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load organization."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [id]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0] || null
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(
        ([key, value]) => {
          if (
            value !== null &&
            value !== ""
          ) {
            data.append(key, value);
          }
        }
      );

      await updateOrganization(id, data);

      navigate(
        `/organizations/${id}`
      );
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        setError(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        setError(
          "Unable to update organization."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading organization...</p>;
  }

  return (
    <div>
      <h2>Edit Organization</h2>

      {error && (
        <div>
          <strong>Error:</strong>
          <pre>{error}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Organization Name
          </label>

          <br />

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="short_name">
            Short Name
          </label>

          <br />

          <input
            id="short_name"
            name="short_name"
            type="text"
            value={formData.short_name}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="organization_type">
            Organization Type
          </label>

          <br />

          <input
            id="organization_type"
            name="organization_type"
            type="text"
            value={formData.organization_type}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">
            Description
          </label>

          <br />

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <br />

        <div>
          <label htmlFor="website">
            Website
          </label>

          <br />

          <input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="email">
            Email
          </label>

          <br />

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="phone_number">
            Phone Number
          </label>

          <br />

          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="logo">
            Replace Logo
          </label>

          <br />

          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="country">
            Country
          </label>

          <br />

          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="state">
            State
          </label>

          <br />

          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="city">
            City
          </label>

          <br />

          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>
            <input
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
            />

            {" "}
            Active organization
          </label>
        </div>

        <br />

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Updating Organization..."
            : "Update Organization"}
        </button>

        {" "}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/organizations/${id}`
            )
          }
          disabled={submitting}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default OrganizationEdit;

