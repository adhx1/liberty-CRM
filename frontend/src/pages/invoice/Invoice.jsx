import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateBill } from "../../api/jobs";
import "./Invoice.css";

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetchBill();
  }, []);

  const fetchBill = async () => {
    try {
      const res = await generateBill(id);
      setBill(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!bill) return <p>Loading...</p>;

  return (
    <div className="invoice-container">

      {/* ACTION BUTTONS */}
      <div className="invoice-actions no-print">
        <button onClick={() => navigate(-1)}>⬅ Back</button>
        <button onClick={handlePrint}>🖨 Download / Print</button>
      </div>

      <div className="invoice-box">
        <div className="invoice-header">
          <h2>LIBERTY OFFICE SERVICES</h2>
          <p>Abu Dhabi, UAE</p>
          <h3>TAX INVOICE</h3>
        </div>

        <div className="invoice-meta">
          <p><strong>Invoice No:</strong> {bill.invoice_no}</p>
          <p><strong>Date:</strong> {bill.job_date}</p>
        </div>

        <div className="customer-section">
          <h4>Bill To:</h4>
          <p>{bill.customer_name}</p>
          <p>{bill.customer_phone}</p>
          <p>{bill.customer_email}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (AED)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{bill.service}</td>
              <td>{bill.total_amount}</td>
            </tr>
          </tbody>
        </table>

        <div className="invoice-summary">
          <p>Total: {bill.total_amount}</p>
          <p>Paid: {bill.paid_amount}</p>
          <p><strong>Balance: {bill.balance_amount}</strong></p>
        </div>

        <div className="invoice-footer">
          <p>Authorized Signature</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;