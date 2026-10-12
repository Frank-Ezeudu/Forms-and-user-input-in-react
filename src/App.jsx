import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  role: "student",
  message: "",
  subscribe: false,
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 " +
  "placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none " +
  "focus:ring-2 focus:ring-indigo-200";

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function SimpleForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  // One handler for every input, keyed by the input's `name` attribute
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Enter your name.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (formData.message.trim().length < 10)
      newErrors.message = "Write at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(formData);
      setFormData(initialForm);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-slate-900">Contact form</h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Text input */}
          <Field label="Name" htmlFor="name" error={errors.name}>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
            />
          </Field>

          {/* Email input */}
          <Field label="Email" htmlFor="email" error={errors.email}>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>

          {/* Select dropdown */}
          <Field label="Role" htmlFor="role">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="student">Student</option>
              <option value="developer">Developer</option>
              <option value="other">Other</option>
            </select>
          </Field>

          {/* Textarea */}
          <Field label="Message" htmlFor="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              className={inputClass}
            />
          </Field>

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Subscribe to updates
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Send message
          </button>
        </form>

        {/* Show submitted data */}
        {submitted && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <h4 className="mb-2 font-medium text-green-800">Message sent</h4>
            <pre className="overflow-x-auto text-xs text-green-900">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
