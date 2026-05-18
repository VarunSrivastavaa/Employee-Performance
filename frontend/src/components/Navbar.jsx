import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Users, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand flex items-center gap-2">
          <Users size={28} />
          <span>PerfAI Analytics</span>
        </Link>
        
        {token && (
          <div className="nav-links">
            <Link to="/" className="nav-link flex items-center gap-2">
              <Users size={18} /> Dashboard
            </Link>
            <Link to="/add-employee" className="nav-link flex items-center gap-2">
              <PlusCircle size={18} /> Add Employee
            </Link>
            <button onClick={handleLogout} className="btn btn-danger flex items-center gap-2" style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
