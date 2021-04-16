import { uuidRegexValidator } from '../../validators/regex';
import { Request, Response } from 'express';
import { Software } from '../../entity/Software';
import { Users } from '../../entity/User';

export const getRecentSoftwares = async (_: Request, res: Response) => {
  try {
    // Obtener los softwares por fecha de creación descendente.
    const data = await Software.find({
      order: {
        createdAt: 'DESC',
      },
    });
    // Devolverlos
    return res.json({
      message: 'Succesful',
      data,
    });
  } catch (error) {
    // Error en la solicitud
    return res.json({
      message: 'There was an error retrieving recent softwares',
      error,
    });
  }
};

export const getOneSoftware = async (req: Request, res: Response) => {
  const softId = req.params.softId;
  // Verificar que el id del software esté presente en los parámetros de la solicitud.
  if (!softId) {
    // No lo está.
    return res.json({
      message: "There's no softId within the params. Try /softwares/:softId",
    });
  } else {
    try {
      // Buscar el software por id.
      const softwareExist = await Software.findOne({
        where: {
          id: softId,
        },
      });
      if (!softwareExist) {
        // El software no existe.
        return res.json({
          message: "The software you're trying to retrieve doesn't exist.",
        });
      } else {
        res.json({
          message: 'Succesfully retrieved',
          data: softwareExist,
        });
      }
    } catch (error) {
      // Error en la solicitud.
      return res.json({
        message: 'There was an error retrieving the software from the database',
      });
    }
  }
};

export const deleteASoftware = async (req: Request, res: Response) => {
  const softId = req.params.softId;
  if (!softId) {
    return res.json({
      message: "There's no softId in the params. Try /softwares/:softId",
    });
  } else {
    try {
      const softwareExist = await Software.findOne({
        where: {
          id: softId,
        },
      });
      if (!softwareExist) {
        return res.json({
          message: "The software you're trying to delete doesn't exist.",
        });
      } else {
        return res.json({
          message: 'The software was succesfully deleted from the database',
        });
      }
    } catch (error) {
      return res.json({
        message: 'There was an error while trying to delete the software',
        error,
      });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  if (!req.query) {
    return res.json({
      message:
        'To find a user you must send either his Id or his username through the query param. ?userId= || ?username=',
    });
  } else {
    if (req.query.userId) {
      const { userId } = req.query;
      if (uuidRegexValidator.test(userId as string)) {
        try {
          const userExist = await Users.findOne({
            where: {
              id: userId,
            },
          });
          if (userExist) {
            userExist.password = '';
            return res.status(200).json({
              message: 'Success',
              user: userExist,
            });
          } else {
            return res.status(404).json({
              message: "The user you're trying to search doesn't exist.",
            });
          }
        } catch (error) {
          return res.status(500).json({
            message: 'There was an error while searching for the user.',
            error,
          });
        }
      } else {
        return res.status(400).json({
          message: "The ID you've sent doesnt match the UUID pattern. Check it out.",
        });
      }
    } else if (req.query.username) {
      const { username } = req.query;
      if (username !== '') {
        try {
          const userExist = await Users.findOne({
            where: {
              username,
            },
          });
          if (userExist) {
            userExist.password = '';
            return res.status(200).json({
              message: 'Success',
              user: userExist,
            });
          } else {
            return res.status(404).json({
              message: "The user you're trying to search doesn't exist.",
            });
          }
        } catch (error) {
          return res.status(500).json({
            message: 'There was an error while searching for the user.',
            error,
          });
        }
      } else {
        return res.status(400).json({
          message: "The username you've sent is empty",
        });
      }
    } else {
      return res.status(400).json({
        message:
          'To find a user you must send either his Id or his username through the query param. ?userId= || ?username=',
      });
    }
  }
};

export const defaultRouteAnswer = (req: Request, res: Response) => {
  return res.send(
    `The route you're trying to access ${
      req.originalUrl
    } and the method you're trying to use ${req.method.toUpperCase()} is not available, created or is restricted.`
  );
};
