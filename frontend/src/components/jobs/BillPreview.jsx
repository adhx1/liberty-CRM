import "./BillPreview.css";

const BillPreview = ({ data }) => {
  return (
    <div className="bill-container">
      <h2>Invoice</h2>
      <p><strong>Invoice No:</strong> {data.invoice_no}</p>
      <p><strong>Date:</strong> {data.job_date}</p>

      <hr />

      <h4>Customer Details</h4>
      <p><strong>Name:</strong> {data.customer_name}</p>
      <p><strong>Phone:</strong> {data.customer_phone}</p>
      <p><strong>Email:</strong> {data.customer_email}</p>

      <hr />

      <h4>Service</h4>
      <p>{data.service}</p>

      <hr />

      <p><strong>Total Amount:</strong> {data.total_amount}</p>
      <p><strong>Paid:</strong> {data.paid_amount}</p>
      <p><strong>Balance:</strong> {data.balance_amount}</p>

      <button onClick={() => window.print()}>
        Print
      </button>
    </div>
  );
};

export default BillPreview;