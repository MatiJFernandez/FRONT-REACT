import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { AuthContext } from '../../context/AuthContext';

const HomeView = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {user ? (
        <div className="text-center">
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-header">
              <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>
                🎉 ¡Bienvenido de vuelta, {user.nombre}!
              </h1>
              <p className="text-muted" style={{ margin: '0.5rem 0 0 0' }}>
                Tu sesión está activa y tienes acceso a todas las funcionalidades disponibles para tu rol.
              </p>
            </div>
            
            <div className="card-body">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '2rem', 
                marginTop: '2rem',
                flexWrap: 'wrap'
              }}>
                <div className="card" style={{ 
                  minWidth: '250px', 
                  textAlign: 'center',
                  border: '2px solid var(--border-color)'
                }}>
                  <div className="card-body">
                    <div style={{ 
                      fontSize: '3rem', 
                      marginBottom: '1rem',
                      color: 'var(--success-color)'
                    }}>
                      📦
                    </div>
                    <h3>Gestión de Productos</h3>
                    <p className="text-muted mb-6">
                      Administra tu catálogo de productos
                    </p>
                    <Link to="/productos">
                      <Button label="Ir a Productos" className="btn btn-success" />
                    </Link>
                  </div>
                </div>
                
                {user.rol === 'admin' && (
                  <div className="card" style={{ 
                    minWidth: '250px', 
                    textAlign: 'center',
                    border: '2px solid var(--warning-color)',
                    backgroundColor: 'rgba(245, 158, 11, 0.05)'
                  }}>
                    <div className="card-body">
                      <div style={{ 
                        fontSize: '3rem', 
                        marginBottom: '1rem',
                        color: 'var(--warning-color)'
                      }}>
                        👥
                      </div>
                      <h3>Panel de Administración</h3>
                      <p className="text-muted mb-6">
                        Gestiona usuarios y permisos del sistema
                      </p>
                      <Link to="/usuarios">
                        <Button label="Panel Admin" className="btn btn-warning" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div style={{ 
                marginTop: '3rem', 
                padding: '1.5rem',
                backgroundColor: 'var(--bg-gray)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-color)'
              }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  📊 Información de tu cuenta
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <strong>Nombre:</strong> {user.nombre}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Rol:</strong> 
                    <span className={`badge badge-${user.rol}`} style={{ marginLeft: '0.5rem' }}>
                      {user.rol === 'admin' ? '�� Administrador' : 
                       user.rol === 'moderador' ? '🛡️ Moderador' : '👤 Cliente'}
                    </span>
                  </div>
                  <div>
                    <strong>Edad:</strong> {user.edad} años
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card-header">
              <h1 style={{ color: 'var(--text-primary)', margin: 0 }}>
                🚀 Bienvenido a CRUD Enterprise
              </h1>
              <p className="text-muted" style={{ margin: '0.5rem 0 0 0' }}>
                Sistema de gestión empresarial para productos y usuarios
              </p>
            </div>
            
            <div className="card-body">
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Para acceder a todas las funcionalidades, por favor inicia sesión o crea una cuenta.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/inicio-sesion">
                  <Button label="Iniciar Sesión" className="btn btn-primary" />
                </Link>
                <Link to="/registro">
                  <Button label="Crear Cuenta" className="btn btn-outline" />
                </Link>
              </div>
              
              <div style={{ 
                marginTop: '3rem', 
                padding: '1.5rem',
                backgroundColor: 'var(--bg-gray)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-color)'
              }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  ✨ Características principales
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  textAlign: 'left'
                }}>
                  <div>🔐 Autenticación segura</div>
                  <div>👥 Gestión de usuarios</div>
                  <div>📦 Gestión de productos</div>
                  <div>��️ Control de acceso por roles</div>
                  <div>📊 Exportación de datos</div>
                  <div>�� Interfaz moderna</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;