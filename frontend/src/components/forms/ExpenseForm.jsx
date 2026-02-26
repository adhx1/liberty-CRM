import { useState } from "react";
import "./PaymentForms.css";

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState(
    initialData || {
      category: "",
      amount: "",
      description: "",
      expense_date: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3>Add Business Expense</h3>

      <input
        name="category"
        placeholder="Category (Rent, Salary, etc)"
        onChange={handleChange}
        required
        value={form.category}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        onChange={handleChange}
        required
        value={form.amount}
      />

      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={form.description}
      />
      <input type="date" 
      name="expense_date"
      min={new Date().toISOString().split("T")[0]}
      onChange={handleChange}
      value={form.expense_date}
      required />

      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;