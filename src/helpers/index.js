

export const propiedadPrecio = ( precio ) => 
        Number(precio).toLocaleString('es-MX',{
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });



    