export  const ExpenseTable = ({ data ,onEdit,onDelete}) => (
<div className="table-wrapper">
    <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((p) => (
        <tr key={p.id}>
          <td>{p.category}</td>
          <td>AED{p.amount}</td>
          <td>{p.description}</td>
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