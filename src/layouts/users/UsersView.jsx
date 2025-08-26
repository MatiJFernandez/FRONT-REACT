import { useUserContext } from '../../context/UserContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function UsersView() {
  const { users, deleteUser, loading, error } = useUserContext();
  const { user: currentUser } = useContext(AuthContext);

  const handleExport = () => {
    exportToPDF(users, 'Usuarios', ['nombre', 'email', 'edad', 'rol']);
  };

  // Rol informativo solamente (edición se hace en la vista de edición)

  const roleBodyTemplate = (rowData) => {
    return (
      <span className={`badge badge-${rowData.rol}`} style={{ 
        backgroundColor: rowData.rol === 'admin' ? '#fef3c7' : 
                     rowData.rol === 'moderador' ? '#dbeafe' : '#dcfce7',
        color: rowData.rol === 'admin' ? '#92400e' : 
               rowData.rol === 'moderador' ? '#1e40af' : '#166534'
      }}>
        {rowData.rol === 'admin' ? '👑 Admin' : 
         rowData.rol === 'moderador' ? '🛡️ Moderador' : '👤 Cliente'}
      </span>
    );
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>
                👥 Panel de Administración de Usuarios
              </h2>
              <p className="text-muted" style={{ margin: '0.5rem 0 0 0' }}>
                Gestión completa de usuarios y roles del sistema
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/usuarios/crear">
                <Button 
                  label="Crear Usuario" 
                  icon="pi pi-plus" 
                  className="btn btn-success"
                />
              </Link>
              
              <Link to="/">
                <Button 
                  label="Volver al Inicio" 
                  icon="pi pi-home" 
                  className="btn btn-secondary"
                />
              </Link>
              
              <Button 
                label="Exportar PDF" 
                icon="pi pi-file-pdf" 
                className="btn btn-warning" 
                onClick={handleExport}
              />
            </div>
          </div>
        </div>
        
        <div className="card-body">
          {loading && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <p>Cargando usuarios...</p>
            </div>
          )}
          
          {error && (
            <div style={{ 
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius)',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && (
            <div style={{ overflow: 'auto' }}>
              <DataTable 
                value={Array.isArray(users) ? users : []} 
                paginator={false} 
                className="table"
                style={{ 
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <Column 
                  field="nombre" 
                  header="Nombre"
                  style={{ fontWeight: '500' }}
                />
                <Column 
                  field="email" 
                  header="Email"
                  style={{ color: 'var(--text-secondary)' }}
                />
                <Column 
                  field="edad" 
                  header="Edad"
                  style={{ textAlign: 'center' }}
                />
                <Column 
                  field="rol" 
                  header="Rol"
                  body={roleBodyTemplate}
                />

                <Column 
                  header="Acciones" 
                  body={(rowData) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/usuarios/editar/${rowData.id}`}>
                        <Button 
                          label="Editar" 
                          icon="pi pi-pencil" 
                          className="btn btn-primary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        />
                      </Link>
                      {rowData.id !== currentUser.id && (
                        <Button 
                          label="Eliminar" 
                          icon="pi pi-trash" 
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                          onClick={() => deleteUser(rowData.id)} 
                        />
                      )}
                    </div>
                  )}
                />
              </DataTable>
            </div>
          )}
          
          {!loading && !error && Array.isArray(users) && users.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <p>No hay usuarios registrados</p>
              <Link to="/usuarios/crear">
                <Button 
                  label="Crear Primer Usuario" 
                  className="btn btn-success"
                  style={{ marginTop: '1rem' }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}