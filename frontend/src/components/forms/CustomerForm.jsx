import { useState, useEffect } from "react";import "./CustomerForm.css";

const CustomerForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      phone: "",
      email: "",
      customer_type: "IND",
    }
  );

  useEffect(() => {
  if (initialData) {
    setForm(initialData);
  }
}, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
        <h3>{initialData ? "Edit Customer" : "Add Customer"}</h3>

    <input
  name="name"
  placeholder="Name"
  value={form.name}
  onChange={handleChange}
  required
/>

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

  <select name="customer_type" value={form.customer_type} onChange={handleChange}>
  <option value="IND">Individual</option>
  <option value="COM">Company</option>
</select>

      <button type="submit">Save</button>
    </form>
  );
};

export default CustomerForm;