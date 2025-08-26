import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, editProduct, getProduct, loading, error } = useProductContext();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0
  });

  // Verificar que solo los admins puedan acceder
  useEffect(() => {
    if (user && user.rol !== 'admin') {
      alert('Acceso denegado. Solo los administradores pueden modificar productos.');
      navigate('/productos');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id, getProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== FRONTEND: ENVIANDO PRODUCTO ===');
    console.log('Form data:', formData);
    console.log('Token en localStorage:', localStorage.getItem('token'));
    console.log('addProduct:', addProduct);
    console.log('editProduct:', editProduct);
    
    try {
      if (id) {
        console.log('Actualizando producto...');
        await editProduct(id, formData);
        alert('Producto actualizado exitosamente');
      } else {
        console.log('Creando producto...');
        await addProduct(formData);
        alert('Producto creado exitosamente');
      }
      navigate('/productos');
    } catch (error) {
      console.error('Error en frontend:', error);
      console.error('Error completo:', error.response?.data || error.message);
      alert('Error al guardar el producto');
    }
  };

  // Si no es admin, mostrar mensaje de acceso denegado
  if (user && user.rol !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2> Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta funcionalidad.</p>
        <p>Solo los administradores pueden crear y editar productos.</p>
        <Button label="Volver a Productos" onClick={() => navigate('/productos')} />
      </div>
    );
  }

  return (
    <div>
      <h2>{id ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
      <p className="text-muted">Panel de administración - Solo para administradores</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Nombre del Producto:
          </label>
          <InputText
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="precio" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Precio:
          </label>
          <InputNumber
            id="precio"
            value={formData.precio}
            onValueChange={(e) => setFormData({ ...formData, precio: e.value })}
            mode="currency"
            currency="USD"
            locale="en-US"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button 
            type="submit" 
            label={id ? 'Actualizar' : 'Crear'} 
            className="p-button-success"
            loading={loading}
          />
          <Button 
            type="button" 
            label="Cancelar" 
            className="p-button-secondary"
            onClick={() => navigate('/productos')}
          />
        </div>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
