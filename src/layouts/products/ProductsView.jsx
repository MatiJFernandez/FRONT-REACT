import { useProductContext } from '../../context/ProductContext';
import { exportToPDF } from '../../utils/ExportToPdf';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';  
import { useState, useMemo } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function ProductsView() {
  const { products, deleteProduct, loading, error } = useProductContext();
  const [search, setSearch] = useState('');
  const { user } = useContext(AuthContext);

  const handleExport = () => {
    exportToPDF(products, 'Productos', ['nombre', 'precio']);
  };

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      String(p?.nombre ?? '').toLowerCase().includes(term) ||
      String(p?.precio ?? '').toLowerCase().includes(term)
    );
  }, [products, search]);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>
                �� Gestión de Productos
              </h2>
              <p className="text-muted" style={{ margin: '0.5rem 0 0 0' }}>
                {user.rol === 'admin' 
                  ? 'Panel completo de administración de productos' 
                  : 'Visualización del catálogo de productos'
                }
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o precio"
                style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              {user.rol === 'admin' && (
                <Link to="/productos/crear">
                  <Button 
                    label="Crear Producto" 
                    icon="pi pi-plus" 
                    className="btn btn-success"
                  />
                </Link>
              )}
              
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
              <p>Cargando productos...</p>
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
                value={filteredProducts} 
                paginator={false} 
                className="table"
                style={{ 
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <Column 
                  field="nombre" 
                  header="Nombre del Producto"
                  style={{ fontWeight: '500' }}
                />
                <Column 
                  field="precio" 
                  header="Precio"
                  body={(rowData) => (
                    <span style={{ 
                      fontWeight: '600',
                      color: 'var(--success-color)'
                    }}>
                      ${rowData.precio}
                    </span>
                  )}
                />

                <Column 
                  header="Acciones" 
                  body={(rowData) => (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {user.rol === 'admin' ? (
                        <>
                          <Link to={`/productos/editar/${rowData.id}`}>
                            <Button 
                              label="Editar" 
                              icon="pi pi-pencil" 
                              className="btn btn-primary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            />
                          </Link>
                          <Button 
                            label="Eliminar" 
                            icon="pi pi-trash" 
                            className="btn btn-danger"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            onClick={() => {
                              if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
                                deleteProduct(rowData.id)
                              }
                            }} 
                          />
                        </>
                      ) : (
                        <span style={{ 
                          color: 'var(--text-muted)', 
                          fontStyle: 'italic',
                          fontSize: '0.875rem'
                        }}>
                          Solo administradores pueden modificar productos
                        </span>
                      )}
                    </div>
                  )}
                />
              </DataTable>
            </div>
          )}
          
          {!loading && !error && Array.isArray(products) && products.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p>No hay productos disponibles</p>
              {user.rol === 'admin' && (
                <Link to="/productos/crear">
                  <Button 
                    label="Crear Primer Producto" 
                    className="btn btn-success"
                    style={{ marginTop: '1rem' }}
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}