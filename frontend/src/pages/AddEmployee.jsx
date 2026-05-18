import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Save, ArrowLeft } from 'lucide-react';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      const payload = {
        ...formData,
        skills: skillsArray,
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };

      await API.post('/employees', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate('/')} className="btn btn-secondary flex items-center gap-2 mb-4" style={{ padding: '0.5rem 1rem' }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 className="mb-4">Add New Employee</h2>
        
        {error && <div className="mb-4" style={{ color: 'var(--danger)' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2">
          <div style={{ gridColumn: 'span 2' }}>
            <label className="text-muted mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              name="name"
              className="input-field" 
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aman Verma"
              required
            />
          </div>

          <div>
            <label className="text-muted mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              name="email"
              className="input-field" 
              value={formData.email}
              onChange={handleChange}
              placeholder="aman@gmail.com"
              required
            />
          </div>

          <div>
            <label className="text-muted mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Department</label>
            <select 
              name="department"
              className="input-field"
              value={formData.department}
              onChange={handleChange}
              required
              style={{ appearance: 'none' }}
            >
              <option value="" disabled>Select Department</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label className="text-muted mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Skills (comma separated)</label>
            <input 
              type="text" 
              name="skills"
              className="input-field" 
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="text-muted mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Performance Score (0-100)</label>
            <input 
              type="number" 
              name="performanceScore"
              className="input-field" 
              value={formData.performanceScore}
              onChange={handleChange}
              min="0" max="100"
              placeholder="85"
              required
            />
          </div>

          <div>
            <label className="text-muted mb-1" style={{ display: 'block', fontSize: '0.9rem' }}>Years of Experience</label>
            <input 
              type="number" 
              name="experience"
              className="input-field" 
              value={formData.experience}
              onChange={handleChange}
              min="0"
              placeholder="3"
              required
            />
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary flex items-center justify-center gap-2" style={{ width: '100%' }} disabled={loading}>
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Employee Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
