import { Request, Response } from 'express';
import { Users } from '../../entity/User';
import * as bcrypt from 'bcryptjs';
import { EmailRegexValidator } from '../../validators/regex';

export const Login = async (req: Request, res: Response) => {
  try {
    // Extraer el correo y contraseña del cuerpo de la petición.
    const { email, password } = req.body;

    // Verificar si alguno de los dos falta.
    if (!email || !password) {
      return res.status(400).json({
        message:
          'There are fields that are compulsory for login and are not within the body. Check email or password fields.',
      });
    } else {
      // Validar que el correo tenga una estructura válida.
      if (!EmailRegexValidator.test(email)) {
        return res.status(400).json({
          message: "The email you've sent is not valid. Check the correct email structuration: test@test.com",
        });
      } else {
        // Validar que el correo del usuario exista dentro de la base de datos.
        const isValidUser = await Users.findOne({
          where: {
            email,
          },
        });
        if (!isValidUser) {
          // No existe.
          return res.status(401).json({
            message: 'Incorrect email or password',
          });
        } else {
          // Validar que la contraseña que el usuario envió, sea válida al compararla con la que está en la base de datos encriptada.
          const isValidLogin = bcrypt.compareSync(password, isValidUser.password);
          if (!isValidLogin) {
            // Contraseña incorrecta.
            return res.status(401).json({
              message: 'Incorrect email or password',
            });
          } else {
            // Eliminar la contraseña del cuerpo.
            delete isValidUser.password;

            // Enviar los datos del usuario.
            return res.status(200).json({
              message: 'Succesfully logged in',
              userData: isValidUser,
            });
          }
        }
      }
    }
  } catch (error) {
    // Error en la solicitud.
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};
