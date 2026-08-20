import { useState, useEffect } from 'react';

const emptyForm = { name: '', email: '', department: '', salary: '' };

function EmployeeForm({ onSubmit, editingEmployee, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
    } else {
      setForm(emptyForm);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.department || !form.salary) return;
    onSubmit({ ...form, salary: Number(form.salary) });
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      <input name="salary" type="number" placeholder="Salary" value={form.salary} onChange={handleChange} />
      <button type="submit">{editingEmployee ? 'Update' : 'Add'} Employee</button>
      {editingEmployee && (
        <button type="button" onClick={onCancelEdit}>Cancel</button>
      )}
    </form>
  );
}

export default EmployeeForm;