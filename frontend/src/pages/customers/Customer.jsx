import { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import Modal from "../../components/modals/Modal";
import CustomerForm from "../../components/forms/CustomerForm";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../../api/customers";
import "./Customer.css";

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  // FETCH CUSTOMERS ON PAGE LOAD
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  // ADD CUSTOMER
 const handleAddCustomer = async (data) => {
  try {
    await createCustomer(data);
    setShowModal(false);
    fetchCustomers();
  } catch (error) {
    console.error("Backend Error:", error.response.data);
  }
};
const handleUpdateCustomer = async (data) => {
  await updateCustomer(editingCustomer.id, data);
  setEditingCustomer(null);
  fetchCustomers();
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    await deleteCustomer(id);
    fetchCustomers();
  }
};


  return (
    <Layout>
      <div className="customer-header">
        <h2>Customers</h2>
        <button onClick={() => setShowModal(true)}>
          Add Customer
        </button>
      </div>

      <div className="customer-list">
        {loading ? (
          <p>Loading...</p>
        ) : customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email || "-"}</td>
                  <td>{c.customer_type}</td>
                 <td>
  <div className="actions">
    <button onClick={() => setEditingCustomer(c)}>Edit</button>
    <button onClick={() => handleDelete(c.id)}>Delete</button>
  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {(showModal || editingCustomer) && (
  <Modal onClose={() => {
    setShowModal(false);
    setEditingCustomer(null);
  }}>
    <CustomerForm
      initialData={editingCustomer}
      onSubmit={
        editingCustomer
          ? handleUpdateCustomer
          : handleAddCustomer
      }
    />
  </Modal>
)}
    </Layout>
  );
};

export default Customers;