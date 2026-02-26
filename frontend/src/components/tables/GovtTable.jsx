export const GovtTable = ({ data, onEdit, onDelete }) => (
<div className="table-wrapper">
    <table>
    <thead>
      <tr>
        <th>Job</th>
        <th>Amount</th>
        <th>Department</th>
        <th>Actions</th>

      </tr>
    </thead>
    <tbody>
      {data.map((p) => (
        <tr key={p.id}>
          <td>{p.job_name} - {p.customer_name}</td>
          <td>{p.amount}</td>
          <td>{p.department}</td>
           <td className="actions">
        <button onClick={() => onEdit(p)}>
          Edit
        </button>
        <button onClick={() => onDelete(p.id)}>
          Delete
        </button>
      </td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
);