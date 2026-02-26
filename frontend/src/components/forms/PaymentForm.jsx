import { useState, useEffect } from "react";
import "./PaymentForms.css";

const PaymentForm = ({ jobs, onSubmit, initialData }) => {
  const [form, setForm] = useState(
    initialData || {
      job: "",
  total_amount: 0,
  paid_amount: "",
  balance: 0,
  payment_mode: "CASH",
  is_settled: false,
    }
  );

  // Initialize form with initialData if provided
  useEffect(() => {
  if (initialData) {
    setForm(initialData);
  }
}, [initialData]);

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (name === "job") {
    const selectedJob = jobs.find(
      (job) => job.id === parseInt(value)
    );

    if (selectedJob) {
      setForm({
        ...form,
        job: value,
        total_amount: selectedJob.total_amount,
        paid_amount: "",
        balance: selectedJob.total_amount,
      });
      return;
    }
  }

  if (name === "paid_amount") {
    const paid = parseFloat(value) || 0;
    const balance = form.total_amount - paid;

    setForm({
      ...form,
      paid_amount: value,
      balance: balance >= 0 ? balance : 0,
    });
    return;
  }

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
};
  const handleSubmit = (e) => {
    e.preventDefault();
     onSubmit({
      job: form.job,
      amount: form.paid_amount,   // 👈 send paid amount
      payment_mode: form.payment_mode,
      is_settled: form.is_settled,
    });
  };
  useEffect(() => {
  console.log("Jobs Data:", jobs);
}, [jobs]);

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>Add Customer Payment</h3>

      <select name="job" onChange={handleChange} required value={form.job}>
        <option value="">Select Job</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}> 
            {job.service_name} - {job.customer_name}
          </option>
        ))}
      </select>

    <input
  type="number"
  value={form.total_amount}
  disabled
  placeholder="Total Amount"
/>
<input
  type="number"
  name="paid_amount"
  value={form.paid_amount}
  onChange={handleChange}
  placeholder="Paid Amount"
/>

<input
  type="number"
  value={form.balance}
  disabled
  placeholder="Balance"
/>

      <select name="payment_mode" onChange={handleChange} value={form.payment_mode}>
        <option value="CASH">Cash</option>
        <option value="CARD">Card</option>
        <option value="ONLINE">Online</option>

      </select>

      <label className="checkbox">
        <input
          type="checkbox"
          name="is_settled"
          onChange={handleChange}
          checked={form.is_settled}
        />
        Card Settled
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default PaymentForm;