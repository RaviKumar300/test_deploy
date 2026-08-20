function EmployeeTable({ employees, onSort, sortConfig, onEdit, onDelete }) {
  const arrow = (field) => {
    if (sortConfig.sortBy !== field) return '';
    return sortConfig.order === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>Name{arrow('name')}</th>
          <th onClick={() => onSort('email')}>Email{arrow('email')}</th>
          <th onClick={() => onSort('department')}>Department{arrow('department')}</th>
          <th onClick={() => onSort('salary')}>Salary{arrow('salary')}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.salary}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button onClick={() => onDelete(emp._id)}>Delete</button>
            </td>
          </tr>
        ))}
        {employees.length === 0 && (
          <tr><td colSpan="5">No employees found</td></tr>
        )}
      </tbody>
    </table>
  );
}

export default EmployeeTable;