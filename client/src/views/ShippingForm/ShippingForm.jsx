import React, { useContext } from "react";
import { useForm, Controller, get } from "react-hook-form";
import CartSummary from "../../components/CartSummary/CartSummary";
import CartContext from "../../context/CartContext";
import { useAuth0 } from '@auth0/auth0-react';
import "./ShippingForm.css";

export const ShippingForm = () => {
  const { user } = useAuth0();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();
  const { precioFinalIva, precioTotal } = useContext(CartContext);
  const subtotal = precioTotal();
  const total = precioFinalIva();

  const onSubmit = () => {
    const formData = getValues();
    const clientData = {
      userEmail: user.email,
      formData: formData,
    };
    console.log(clientData);
  };

  return (
    <div className="general">
      <CartSummary
        mostrarCheckout={false}
        className="cartSummary"
        subtotal={subtotal}
        total={total}
      />
      <span className="close">&times;</span>
      <div className="containerForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Formulario de Envio</h2>
          <div className="form-group">
            <label>Nombre del Titular:</label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Campo obligatorio",
                maxLength: {
                  value: 50,
                  message: "Nombre demasiado largo, máximo 50 caracteres.",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder=" Ingrese el nombre del titular"
                />
              )}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>Numero de Telefono:</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Campo obligatorio",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Ingrese un número de teléfono válido.",
                },
              }}
              render={({ field }) => (
                <input {...field} placeholder=" +54 1152193352" />
              )}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>País:</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Campo obligatorio" }}
              render={({ field }) => (
                <input {...field} placeholder=" Ingrese el país" />
              )}
            />
            {errors.country && <p>{errors.country.message}</p>}
          </div>
          <div className="form-group">
            {errors.country && <p>{errors.country.message}</p>}
          </div>
          <div className="form-group">
            <label>Provincia o Ciudad:</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "Campo obligatorio" }}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder=" Ingrese la provincia o ciudad"
                />
              )}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div className="form-group">
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div className="form-group">
            <label>Dirección de Domicilio:</label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Campo obligatorio" }}
              render={({ field }) => (
                <input {...field} placeholder=" Ej: Calle 123 4B CP5000" />
              )}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <button
            className= "mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-600"
            disabled={Object.keys(errors).length > 0}
          >
            Enviar Datos
          </button>
        </form>
      </div>
    </div>
  );
};
