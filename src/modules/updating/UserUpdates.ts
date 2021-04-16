import { Request, Response } from 'express';
import { Users } from '../../entity/User';
import { getManager } from 'typeorm';
import * as cloudinary from 'cloudinary';
import * as path from 'path';
import * as fs from 'fs';

export const UpdateUserInfo = async (req: Request, res: Response) => {
  if (!req.query) {
    return res.status(400).json({
      message: 'Query is empty! Test something with ?username= or ?userId=',
    });
  } else {
    if (!req.body) {
      return res.status(400).json({
        message: 'You cannot send empty body request for an update!',
      });
    } else {
      const { username, userId } = req.query;
      let userExist: Users;
      if (username) {
        try {
          userExist = await Users.findOne({
            where: {
              username,
            },
          });
        } catch (error) {
          return res.status(500).json({
            message: 'There was an error while searching user existance.',
            error,
          });
        }
      } else {
        try {
          userExist = await Users.findOne({
            where: {
              id: userId,
            },
          });
        } catch (error) {
          return res.status(500).json({
            message: 'There was an error while searching user existance.',
            error,
          });
        }
      }

      if (req.query.userprofilepic) {
        const imageTempPath = req.files[0].path;
        const ext = path.extname(req.files[0].originalname).toLowerCase();

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.svg') {
          try {
            const response = await cloudinary.v2.uploader.upload(imageTempPath, {});
            userExist.profilePic = response.secure_url;
            fs.unlink(imageTempPath, () => null);
            try {
              await userExist.save();
              return res.status(200).json({
                message: 'Profile pic has been updated.',
                userExist,
              });
            } catch (error) {
              return res.status(500).json({
                message: 'There was an error while saving pic within database.',
                error,
              });
            }
          } catch (error) {
            return res.status(500).json({
              message: 'There was an error while sending pic to cloudinary',
              error,
            });
          }
        } else {
          return res.status(400).json({
            message:
              "The image you're trying to upload doesn't meet the requirements for an image. Check extension.",
          });
        }
      } else {
        const body = req.body;

        try {
          const updatedUser = await getManager().getRepository(Users).update(userExist.id, body);
          return res.status(200).json({
            message: 'Users has been succesfully updated.',
            updatedUser,
          });
        } catch (error) {
          return res.status(500).json({
            message: 'There was an error trying to update the user',
            error,
          });
        }
      }
    }
  }
};
