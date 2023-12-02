import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CartSummary from '../../components/CartSummary/CartSummary';
import { CartContext } from '../../context/CartContext';



export const ShippingForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
   const {precioFinalIva,precioTotal}=useContext(CartContext) 

  const onSubmit = () => {
    //envio de datos 
    
    onClose();
  };

  const subtotal = precioTotal();
  const total = precioFinalIva();

  return  (
    <div>
      
      <CartSummary subtotal={subtotal} total={total} />
  
    
      <div className="modal-content">
    <span className="close" >&times;</span>
    <h2>Formulario de Pago</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Nombre del Titular:</label>
        <Controller
          name="cardHolderName"
          control={control}
          rules={{
            required: 'Campo obligatorio',
            maxLength: {
              value: 50,
              message: 'Nombre demasiado largo, máximo 50 caracteres.',
            },
          }}
          render={({ field }) => <input {...field} placeholder="Ingrese el nombre del titular" />}
        />
        {errors.cardHolderName && <p>{errors.cardHolderName.message}</p>}
      </div>

      <div className="form-group">
        <label>Numero de Telefono:</label>
        <Controller
          name="phoneNumber"
          control={control}
          rules={{
            required: 'Campo obligatorio',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Ingrese un número de teléfono válido.',
            },
          }}
          render={({ field }) => <input {...field} placeholder="Ingrese el número de teléfono" />}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>

      <div className="form-group">
        <label>País:</label>
        <Controller
          name="country"
          control={control}
          rules={{ required: 'Campo obligatorio' }}
          render={({ field }) => <input {...field} placeholder="Ingrese el país" />}
        />
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      <div className="form-group">
        <label>Provincia o Ciudad:</label>
        <Controller
          name="city"
          control={control}
          rules={{ required: 'Campo obligatorio' }}
          render={({ field }) => <input {...field} placeholder="Ingrese la provincia o ciudad" />}
        />
        {errors.city && <p>{errors.city.message}</p>}
      </div>

      <div className="form-group">
        <label>Documento de Identidad:</label>
        <Controller
          name="idDocument"
          control={control}
          rules={{
            required: 'Campo obligatorio',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Ingrese un número de documento válido.',
            },
          }}
          render={({ field }) => <input {...field} placeholder="Ingrese el documento de identidad" />}
        />
        {errors.idDocument && <p>{errors.idDocument.message}</p>}
      </div>

      <div className="form-group">
        <label>Dirección de Domicilio:</label>
        <Controller
          name="homeAddress"
          control={control}
          rules={{ required: 'Campo obligatorio' }}
          render={({ field }) => <input {...field} placeholder="Ingrese la dirección de domicilio" />}
        />
        {errors.homeAddress && <p>{errors.homeAddress.message}</p>}
      </div>

      <button className="btForm" type="submit" disabled={Object.keys(errors).length > 0}>
        Enviar Datos
      </button>
    </form>
  </div>
      
    </div>
  );
  
};

