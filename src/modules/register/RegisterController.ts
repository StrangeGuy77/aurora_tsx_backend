import { Request, Response } from 'express';
import { Users } from '../../entity/User';
import * as bcrypt from 'bcryptjs';
import { EmailRegexValidator } from '../../validators/regex';

export const SignUp = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({
      message: 'Either the body is empty or it left for username, email or password fields.',
    });
  } else {
    try {
      const duplicatedEmail = await Users.findOne({
        where: {
          email,
        },
      });
      if (duplicatedEmail) {
        return res.status(400).json({
          message: "The email you're trying signup with is already in use.",
        });
      } else {
        if (EmailRegexValidator.test(email)) {
          try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = Users.create({
              email,
              password: hashedPassword,
              username,
            });
            try {
              await newUser.save();
              newUser.password = '';
              return res.status(200).json({
                message: 'The user was created succesfully',
                newUser,
              });
            } catch (error) {
              return res.status(500).json({
                message: 'There was an error trying to save the user.',
                error,
              });
            }
          } catch (error) {
            return res.status(500).json({
              message: 'There was an error while creating the user.',
              error,
            });
          }
        } else {
          return res.status(400).json({
            message: 'The email is bad structured. It should match something like... test@test.com',
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: 'There was an error while searching for duplicated emails',
        error,
      });
    }
  }
};
