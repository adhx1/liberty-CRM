import { useState, useEffect } from "react";
import "./PaymentForms.css";

const GovtFeeForm = ({ jobs, onSubmit, initialData }) => {
  const [form, setForm] = useState(
    initialData || {
      job: "",
      department: "",
      amount: "",
      paid_date: "",
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
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Government Fee" : "Add Government Fee"}</h3>

      <select name="job" value={form.job} onChange={handleChange} required>
        <option value="">Select Job</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.service_name} - {job.customer_name}
          </option>
        ))}
      </select>

      <input
        name="department"
        placeholder="Dept"
        value={form.department}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="paid_date"
        min={new Date().toISOString().split("T")[0]}
        value={form.paid_date}
        onChange={handleChange}
        required
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default GovtFeeForm;