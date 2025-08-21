import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!user) {
    return (
      <nav className="navbar" style={{
        backgroundColor: '#1e293b',
        padding: '1rem 0',
        boxShadow: 'var(--shadow-lg)',
        borderBottom: '1px solid #334155'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ 
              color: 'white', 
              margin: 0, 
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}>
              🏢 CRUD Enterprise
            </h2>
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/inicio-sesion">
              <Button 
                label="Iniciar Sesión" 
                className={`btn ${isActive('/inicio-sesion') ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  color: isActive('/inicio-sesion') ? 'white' : '#e2e8f0',
                  borderColor: '#e2e8f0'
                }}
              />
            </Link>
            <Link to="/registro">
              <Button 
                label="Registrarse" 
                className="btn btn-primary"
              />
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar" style={{
      backgroundColor: '#1e293b',
      padding: '1rem 0',
      boxShadow: 'var(--shadow-lg)',
      borderBottom: '1px solid #334155'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ 
            color: 'white', 
            margin: 0, 
            fontSize: '1.5rem',
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            🏢 CRUD Enterprise
          </h2>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span style={{ color: '#e2e8f0', fontSize: '0.875rem' }}>
              👋 <strong>{user.nombre}</strong>
            </span>
            <span className={`badge badge-${user.rol}`} style={{ 
              backgroundColor: user.rol === 'admin' ? '#fef3c7' : 
                           user.rol === 'moderador' ? '#dbeafe' : '#dcfce7',
              color: user.rol === 'admin' ? '#92400e' : 
                     user.rol === 'moderador' ? '#1e40af' : '#166534'
            }}>
              {user.rol === 'admin' ? '👑 Admin' : 
               user.rol === 'moderador' ? '🛡️ Moderador' : '👤 Cliente'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/">
              <Button 
                label="Inicio" 
                className={`btn ${isActive('/') ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  color: isActive('/') ? 'white' : '#e2e8f0',
                  borderColor: '#e2e8f0'
                }}
              />
            </Link>
            
            <Link to="/productos">
              <Button 
                label="Productos" 
                className={`btn ${isActive('/productos') ? 'btn-primary' : 'btn-outline'}`}
                style={{ 
                  color: isActive('/productos') ? 'white' : '#e2e8f0',
                  borderColor: '#e2e8f0'
                }}
              />
            </Link>
            
            {user.rol === 'admin' && (
              <Link to="/usuarios">
                <Button 
                  label="Panel Admin" 
                  className={`btn ${isActive('/usuarios') ? 'btn-warning' : 'btn-outline'}`}
                  style={{ 
                    color: isActive('/usuarios') ? 'white' : '#f59e0b',
                    borderColor: '#f59e0b'
                  }}
                />
              </Link>
            )}
            
            <Button 
              label="Cerrar Sesión" 
              icon="pi pi-sign-out"
              className="btn btn-danger" 
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;