export const PaymentTable = ({ data, onEdit, onDelete }) => (
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Job</th>
          <th>Amount</th>
          <th>Mode</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>{p.job_name}</td>
            <td className="amount">{p.amount}</td>
            <td>{p.payment_mode}</td>
            <td className="balance">{p.balance}</td> 
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