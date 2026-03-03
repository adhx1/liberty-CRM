export const PaymentTable = ({ data, onEdit, onDelete }) => (
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Job</th>
          <th>Total Amount</th>
          <th>Paid</th>
          <th>Balance</th>
          <th>Mode</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>{p.job_name}</td>

            <td className="amount">AED{p.total_amount}</td>

            <td className="paid">AED{p.amount}</td>

            <td className="balance">AED{p.balance ?? 0}</td>

            <td>{p.payment_mode}</td>

            <td className="actions">
              <button onClick={() => onEdit(p)}>Edit</button>
              <button onClick={() => onDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
