import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createOrganization } from "../services/organizationsApi";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
// import Textarea from "../components/ui/Textarea";
// import Checkbox from "../components/ui/Checkbox";


function OrganizationCreate() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] =
    useState(false);

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

    const organization =
      await createOrganization(data);

    navigate(
      `/organizations/${organization.id}`
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
        "Unable to create organization."
      );
    }
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div>
      <h2>Create Organization</h2>

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
            placeholder="https://example.org"
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
            Logo
          </label>

          <br />

          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Logo URL or path"
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
            ? "Creating Organization..."
            : "Create Organization"}
        </button>
      </form>
    </div>
  );
}

export default OrganizationCreate;

