import { useState, useEffect } from "react";
import { getCustomers } from "../../api/customers";
import "./JobForm.css";

const JobForm = ({ onSubmit, initialData }) => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(
  initialData || {
    customer: "",
    service_name: "",
    due_date: "",
    total_amount: "",
    status: "PENDING",
  }
);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
  if (initialData) {
    setForm(initialData);
  }
}, [initialData]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h3>Create Job</h3>

      <select name="customer" onChange={handleChange} value={form.customer} required>
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        name="service_name"
        placeholder="Service Name"
        onChange={handleChange}
        required
        value={form.service_name}
      />

      <input
        type="date"
        name="due_date"
        min={new Date().toISOString().split("T")[0]}
        onChange={handleChange}
        required
        value={form.due_date}
      />

      <input
        type="number"
        name="total_amount"
        placeholder="Total Amount"
        onChange={handleChange}
        required
        value={form.total_amount}
      />

      <select name="status" onChange={handleChange} value={form.status}>
        <option value="PENDING">Pending</option>
        <option value="PROCESSING">Processing</option>
        <option value="COMPLETED">Completed</option>
        <option value="DELIVERED">Delivered</option>

      </select>

      <button type="submit">Save Job</button>
    </form>
  );
};

export default JobForm;