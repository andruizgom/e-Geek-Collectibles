import axios from 'axios'
export const uploadImage = async (file) => {
  try {
    const URL = "https://api.imgbb.com/1/upload?expiration=600&key=9050e732693a2f869d58ff8ab3b5d0ea";
    let formData = new FormData();
    formData.append("image", file[0],file[0].name);
    const {data}  = await axios.post(URL, formData);
    const image = data?.data?.display_url
    const status = data.status
    // console.log(status)
    return {image,status}
  } catch (error) {
    if (error.response) {
      // La solicitud fue realizada y el servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error de respuesta del servidor:", error.response.data);
      console.error("Código de estado:", error.response.status);
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor");
    } else {
      // Hubo un error al configurar la solicitud
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw new Error(error);
  }
};
