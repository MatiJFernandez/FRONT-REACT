import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'primereact/button';

export default function HomeView() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🏢</div>
            <h1>Bienvenido a CRUD Enterprise</h1>
            <p className="text-muted mb-4">
              Sistema de gestión empresarial para administrar productos y usuarios
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/inicio-sesion">
                <Button 
                  label="Iniciar Sesión" 
                  icon="pi pi-sign-in" 
                  className="btn btn-primary"
                  size="large"
                />
              </Link>
              <Link to="/registro">
                <Button 
                  label="Registrarse" 
                  icon="pi pi-user-plus" 
                  className="btn btn-success"
                  size="large"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>👋 Bienvenido, {user.nombre}!</h1>
          <p className="text-muted">
            Panel de control de CRUD Enterprise
          </p>
        </div>
        
        <div className="card-body">
          <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="card">
              <div className="card-header">
                <h3>📊 Productos</h3>
              </div>
              <div className="card-body">
                <p className="text-muted mb-3">
                  Gestiona el catálogo de productos del sistema
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <Link to="/productos">
                    <Button 
                      label="Ver Productos" 
                      icon="pi pi-list" 
                      className="btn btn-primary"
                    />
                  </Link>
                  {user.rol === 'admin' && (
                    <Link to="/productos/crear">
                      <Button 
                        label="Crear Producto" 
                        icon="pi pi-plus" 
                        className="btn btn-success"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {user.rol === 'admin' && (
              <div className="card">
                <div className="card-header">
                  <h3>👥 Usuarios</h3>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">
                    Administra usuarios y roles del sistema
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Link to="/usuarios">
                      <Button 
                        label="Ver Usuarios" 
                        icon="pi pi-users" 
                        className="btn btn-primary"
                      />
                    </Link>
                    <Link to="/usuarios/crear">
                      <Button 
                        label="Crear Usuario" 
                        icon="pi pi-user-plus" 
                        className="btn btn-success"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h3>ℹ️ Información de Cuenta</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <strong>Nombre:</strong> {user.nombre}
                  </div>
                  <div>
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div>
                    <strong>Edad:</strong> {user.edad} años
                  </div>
                  <div>
                    <strong>Rol:</strong> 
                    <span className={`badge badge-${user.rol} ml-2`}>
                      {user.rol === 'admin' ? '👑 Admin' : 
                       user.rol === 'moderador' ? '🛡️ Moderador' : '👤 Cliente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}