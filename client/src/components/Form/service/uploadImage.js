// import axios from 'axios'
// export const uploadImage = async (image) => {
//   try {
//     const URL = "https://api.imgbb.com/1/upload?expiration=600&key=9050e732693a2f869d58ff8ab3b5d0ea";
//     let formData = new FormData();
//     formData.append("image", image);
//     console.log(image);
//     const { data } = await axios.post(URL, formData);
//     console.log(data);
//   } catch (error) {
//     if (error.response) {
//       // La solicitud fue realizada y el servidor respondió con un código de estado fuera del rango 2xx
//       console.error("Error de respuesta del servidor:", error.response.data);
//       console.error("Código de estado:", error.response.status);
//     } else if (error.request) {
//       // La solicitud fue realizada pero no se recibió respuesta
//       console.error("No se recibió respuesta del servidor");
//     } else {
//       // Hubo un error al configurar la solicitud
//       console.error("Error al configurar la solicitud:", error.message);
//     }
//     throw new Error(error);
//   }
// };




export const uploadImage = async (file) => {
  try {
    const URL = "https://api.imgbb.com/1/upload?expiration=600&key=9050e732693a2f869d58ff8ab3b5d0ea ";

    // Leer el contenido del archivo como base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          // Crear FormData y adjuntar el archivo en formato base64
          let formData = new FormData();
          formData.append("image", reader.result);

          // Realizar la solicitud a ImgBB
          const resp = await fetch(URL, {
            method: "POST",
            body: formData,
          });
          const data = await resp.json();
          console.log("test",data);

          // Devolver la URL de la imagen subida
          resolve(data.display_url);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

