import { useState, useEffect, useCallback } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import { fetchEmployees, addEmployee, editEmployee, removeEmployee } from './services/employeeService';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ sortBy: 'createdAt', order: 'asc' });

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees(sortConfig.sortBy, sortConfig.order);
      setEmployees(data);
      setError('');
    } catch (err) {
      setError('Failed to load employees. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [sortConfig]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingEmployee) {
        await editEmployee(editingEmployee._id, formData);
        setEditingEmployee(null);
      } else {
        await addEmployee(formData);
      }
      loadEmployees();
    } catch (err) {
      setError('Failed to save employee.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await removeEmployee(id);
      loadEmployees();
    } catch (err) {
      setError('Failed to delete employee.');
    }
  };

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      sortBy: field,
      order: prev.sortBy === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="app">
      <h1>Employee Directory</h1>
      {error && <p className="error">{error}</p>}

      <EmployeeForm
        onSubmit={handleAddOrUpdate}
        editingEmployee={editingEmployee}
        onCancelEdit={() => setEditingEmployee(null)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeTable
          employees={employees}
          onSort={handleSort}
          sortConfig={sortConfig}
          onEdit={setEditingEmployee}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;