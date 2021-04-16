import { uuidRegexValidator } from '../../validators/regex';
import { Request, Response } from 'express';
import { genRandomId } from '../../utils/helper';
import { Software } from '../../entity/Software';
import { Users } from '../../entity/User';
import * as cloudinary from 'cloudinary';
import * as path from 'path';
import * as fs from 'fs-extra';

export const uploadSoftware = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({
      message: 'Body is empty! You cannot save an empty software.',
    });
  } else {
    const { title, description, devLanguages, price } = req.body;
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message:
          'userId param is empty! You cannot save a software without a user relationship. Please add userId to the route with /softwares/:userId',
      });
    } else {
      if (!title || !description || !devLanguages || !price || !req.files) {
        return res.status(400).json({
          message:
            "At least one of the following properties aren't within the body: title, description, devLanguages, price",
        });
      } else {
        if (uuidRegexValidator.test(userId)) {
          const userExist = await Users.findOne({
            where: {
              id: userId,
            },
          });
          if (!userExist) {
            return res.status(404).json({
              message:
                "The user who you're trying to relate to this software cannot be found within database. Please verify that the userId you put in the route param is correct.",
            });
          } else {
            try {
              let url: string;
              url = genRandomId();

              const imageTempPath = req.files[0].path;
              const ext = path.extname(req.files[0].originalname).toLowerCase();
              const targetPath = path.resolve(`src/server/temp/upload/${url}${ext}`);

              if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.svg') {
                /*
                 * Example Cloudinary uploading
                 * cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
                 */

                try {
                  await fs.rename(imageTempPath, targetPath);
                  try {
                    const response = await cloudinary.v2.uploader.upload(targetPath, {});
                    const newSoftware = Software.create({
                      description,
                      price,
                      title,
                      devLanguages: JSON.parse(devLanguages),
                      filename: url + ext,
                      userUploaderName: userExist.username,
                      imageUrl: response.secure_url,
                      user: userExist,
                    });
                    try {
                      await newSoftware.save();
                      return res.status(200).json({
                        message: 'Software succesfully saved.',
                        newSoftware,
                      });
                    } catch (error) {
                      return res.status(500).json({
                        message: 'There was a problem trying to save the software.',
                        error,
                      });
                    }
                  } catch (error) {
                    return res.status(500).json({
                      message: 'There was an error uploading image to the remote server.',
                      error,
                    });
                  }
                } catch (error) {
                  return res.status(500).json({
                    message: 'There was an error while replacing image route path',
                    error,
                  });
                }
              }
            } catch (error) {
              return res.status(500).json({
                message: 'There was an error while verifying image extensions',
                error,
              });
            }
          }
        } else {
          return res.status(400).json({
            message: "The uuid is non-sense! UUID's patterns are like: 6a2f41a3-c54c-fce8-32d2-0324e1c32e22",
          });
        }
      }
    }
  }
};
