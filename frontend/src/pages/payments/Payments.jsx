import { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Modal from "../../components/modals/Modal";
import { PaymentTable } from "../../components/tables/PaymentTable ";
import { GovtTable } from "../../components/tables/GovtTable";
import { ExpenseTable } from "../../components/tables/ExpenseTable";
import PaymentForm from "../../components/forms/PaymentForm";
import GovtFeeForm from "../../components/forms/GovtFeeForm";
import ExpenseForm from "../../components/forms/ExpenseForm";

import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../../api/payments";
import {
  getGovtFees,
  createGovtFee,
  updateGovtFee,
  deleteGovtFee,
} from "../../api/govtFees";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../api/expenses";
import { getJobs } from "../../api/jobs";
import "./Payments.css";

const Payments = () => {
  const [jobs, setJobs] = useState([]);

  const [payments, setPayments] = useState([]);
  const [govtFees, setGovtFees] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null);
  const [editingGovtFee, setEditingGovtFee] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [jobRes, payRes, feeRes, expRes] =
      await Promise.all([
        getJobs(),
        getPayments(),
        getGovtFees(),
        getExpenses(),
      ]);

    setJobs(jobRes.data);
    setPayments(payRes.data);
    setGovtFees(feeRes.data);
    setExpenses(expRes.data);
  };
const Section = ({ title, onAdd, children }) => (
  <div className="payment-section">
    <div className="section-header">
      <h3>{title}</h3>
      <button onClick={onAdd}>Add</button>
    </div>
    {children}
  </div>
);
  /* ------------------ HANDLERS ------------------ */

  const handleAddPayment = async (data) => {
    await createPayment(data);
    setActiveModal(null);
    fetchAll();
  };

const handleAddGovtFee = async (data) => {
  try {
    await createGovtFee(data);
    setActiveModal(null);
    fetchAll();
  } catch (err) {
    console.error("Full Error:", err);
    console.error("Backend Response:", err.response);
    console.error("Validation Errors:", err.response?.data);
  }
};

  const handleAddExpense = async (data) => {
    await createExpense(data);
    setActiveModal(null);
    fetchAll();
  };
  const handleUpdatePayment = async (data) => {
  try {
    await updatePayment(editingPayment.id, data);
    setEditingPayment(null);
    fetchAll();
  } catch (err) {
    console.error("Update failed:", err.response?.data);
  }
};
const handleDeletePayment = async (id) => {
  if (window.confirm("Delete this payment?")) {
    try {
      await deletePayment(id);
      fetchAll();
    } catch (err) {
      console.error("Delete failed:", err.response?.data);
    }
  }
}; 
const handleUpdateGovtFee = async (data) => {
  try {
    await updateGovtFee(editingGovtFee.id, data);
    setEditingGovtFee(null);
    fetchAll();
  } catch (err) {
    console.error("Update failed:", err.response?.data);
  }
};
const handleDeleteGovtFee = async (id) => {
  if (window.confirm("Delete this govt fee?")) {
    try {
      await deleteGovtFee(id);
      fetchAll();
    } catch (err) {
      console.error("Delete failed:", err.response?.data);
    }
  }
};
const handleUpdateExpense = async (data) => {
  try {
    await updateExpense(editingExpense.id, data);
    setEditingExpense(null);
    fetchAll();
  } catch (err) {
    console.error("Update failed:", err.response?.data);
  }
};
const handleDeleteExpense = async (id) => {
  if (window.confirm("Delete this expense?")) {
    try {
      await deleteExpense(id);
      fetchAll();
    } catch (err) {
      console.error("Delete failed:", err.response?.data);
    }
  }
};

  return (
    <Layout>
      <h2>Payments & Expenses</h2>

      {/* CUSTOMER PAYMENTS */}
      <Section
        title="Customer Payments"
        onAdd={() => setActiveModal("payment")}
      >
        <PaymentTable
  data={payments}
  onEdit={setEditingPayment}
  onDelete={handleDeletePayment}
/>
      </Section>

      {/* GOVT FEES */}
      <Section
        title="Government Fees"
        onAdd={() => setActiveModal("govt")}
      >
        <GovtTable
  data={govtFees}
  onEdit={setEditingGovtFee}
  onDelete={handleDeleteGovtFee}
/>
      </Section>

      {/* EXPENSES */}
      <Section
        title="Business Expenses"
        onAdd={() => setActiveModal("expense")}
      >
        <ExpenseTable
  data={expenses}
  onEdit={setEditingExpense}
  onDelete={handleDeleteExpense}
/>
      </Section>

      {/* MODALS */}
 {(activeModal === "payment" || editingPayment) && (
  <Modal
    onClose={() => {
      setActiveModal(null);
      setEditingPayment(null);
    }}
  >
    <PaymentForm
      jobs={jobs}
      initialData={editingPayment}
      onSubmit={
        editingPayment
          ? handleUpdatePayment
          : handleAddPayment
      }
    />
  </Modal>
)}

      {(activeModal === "govt" || editingGovtFee) && (
        <Modal
          onClose={() => {
            setActiveModal(null);
            setEditingGovtFee(null);
          }}
        >
          <GovtFeeForm
            jobs={jobs}
            initialData={editingGovtFee}
            onSubmit={
              editingGovtFee
                ? handleUpdateGovtFee
                : handleAddGovtFee
            }
          />
        </Modal>
      )}

      {(activeModal === "expense" || editingExpense) && (
        <Modal
          onClose={() => {
            setActiveModal(null);
            setEditingExpense(null);
          }}
        >
          <ExpenseForm
            initialData={editingExpense}
            onSubmit={
              editingExpense
                ? handleUpdateExpense
                : handleAddExpense
            }
          />
        </Modal>
      )}
    </Layout>
  );
};

export default Payments;