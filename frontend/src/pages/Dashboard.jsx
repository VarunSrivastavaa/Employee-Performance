import { useState, useEffect } from 'react';
import API from '../api';
import { Search, Trash2, Cpu, BarChart2, Briefcase } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async (department = '') => {
    try {
      const url = department ? `/employees/search?department=${department}` : '/employees';
      const { data } = await API.get(url);
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchTerm);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await API.delete(`/employees/${id}`);
        fetchEmployees(searchTerm);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSelect = (id) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(eId => eId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const generateRecommendation = async () => {
    if (selectedEmployees.length === 0) return;
    setLoading(true);
    try {
      const { data } = await API.post('/ai/recommend', { employeeIds: selectedEmployees });
      setAiRecommendation(data.recommendation);
    } catch (err) {
      console.error(err);
      setAiRecommendation('Failed to fetch recommendation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Employee Directory</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search by department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px' }}
          />
          <button type="submit" className="btn btn-secondary flex items-center gap-2">
            <Search size={18} />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div className="grid grid-cols-2">
            {employees.map(emp => (
              <div key={emp._id} className="employee-card glass-panel" style={{ cursor: 'pointer', border: selectedEmployees.includes(emp._id) ? '2px solid var(--primary)' : '' }} onClick={() => handleSelect(emp._id)}>
                <div className="flex justify-between items-center mb-2">
                  <h3 style={{ marginBottom: 0 }}>{emp.name}</h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(emp._id); }} 
                    className="btn btn-danger" 
                    style={{ padding: '0.4rem', borderRadius: '50%' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
                  <Briefcase size={16} /> {emp.department} • {emp.experience} yrs exp
                </div>
                <div className="flex items-center gap-2 mb-3 text-muted" style={{ fontSize: '0.9rem' }}>
                  <BarChart2 size={16} /> Score: <strong style={{ color: emp.performanceScore >= 80 ? 'var(--success)' : emp.performanceScore < 60 ? 'var(--danger)' : 'var(--secondary)' }}>{emp.performanceScore}/100</strong>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {emp.skills.map((skill, index) => (
                    <span key={index} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
            {employees.length === 0 && (
              <div className="text-muted text-center" style={{ gridColumn: 'span 2', padding: '3rem' }}>
                No employees found.
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '100px' }}>
            <h3 className="flex items-center gap-2 mb-3">
              <Cpu size={24} style={{ color: 'var(--primary)' }} /> AI Assistant
            </h3>
            <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
              Select one or more employees to generate AI-powered performance insights, promotion recommendations, or training plans.
            </p>
            
            <button 
              className="btn btn-primary w-full flex items-center justify-center gap-2 mb-4" 
              style={{ width: '100%' }}
              onClick={generateRecommendation}
              disabled={selectedEmployees.length === 0 || loading}
            >
              <Cpu size={18} />
              {loading ? 'Analyzing...' : `Generate Insights (${selectedEmployees.length})`}
            </button>

            {aiRecommendation && (
              <div className="mt-4 p-4 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', maxHeight: '400px', overflowY: 'auto' }}>
                <h4 className="mb-2" style={{ color: 'var(--secondary)' }}>Recommendation:</h4>
                <div style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {aiRecommendation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
