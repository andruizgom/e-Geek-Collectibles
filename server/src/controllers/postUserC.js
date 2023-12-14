const { Users } = require("../db");
const { transporter } = require("../email/mailConfig");

const postUserC = async (req) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Datos incompletos");
    }

    const [user, created] = await Users.findOrCreate({
      where: {
        email: email,
      },
    });
if (created) {
      try {
        await transporter.sendMail({
          from: '"e-Geek Collectibles" <pfhenry8@gmail.com>',
          to: user.email,
          subject: "Bienvenido e-Geek Collectibles",
          html: user.name
            ? `<h3>Bievenido ${user.name} a e-Geek Collectibles!! Espero encuentres ese anillo único o ese spiderman de edición limitada que buscas!☺</h3>`
            : `<h3>Bievenido ${user.email} a e-Geek Collectibles!! Espero encuentres ese anillo único o ese spiderman de edición limitada que buscas!☺</h3>`,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  postUserC,
};
