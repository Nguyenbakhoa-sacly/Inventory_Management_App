'use strict'

import { Response, Request } from 'express';
import UserModel from '../models/User.model';
import bcrypt from 'bcrypt'
import { User } from '../../types/auth.type';
import { getAccessToken } from '../utils/getAccessToken';

class UsersController {
  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        return res.status(409).json({ message: 'Tài khoản đã tồn tại!' });
      }
      const hashPassword = await bcrypt.hashSync(password, 10)
      const newUser: any = new UserModel({
        email: email,
        name: name,
        password: hashPassword,
      })
      await newUser.save()
      const { password: pass, ...rest } = newUser._doc;
      return res.status(200).json({
        message: 'Đăng ký người dùng thành công!',
        data: {
          rest,
          token: await getAccessToken({
            _id: newUser._id,
            email: newUser.email,
            rule: 1
          })
        }
      })
    } catch (err: any) {
      return res.status(400).json({
        error: err,
        message: 'Đăng ký người dùng không thành công!'
      });
    }
  }

  LogIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user: any = await UserModel.findOne({ email: email })
      if (!user) {
        return res.status(404).json({ message: 'Tài khoản không tông tại' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Đăng nhập thất bại, vui lòng kiểm trả lại EMail/Password và thử lại' });
      }
      const { password: pass, ...rest } = user._doc;
      return res.status(200).json({
        message: 'Đăng nhập thành công!',
        data: {
          rest,
          token: await getAccessToken({
            _id: user._id,
            email: user.email,
            rule: user.rule ?? 1,
          })
        }
      })
    } catch (err: any) {
      return res.status(400).json({
        error: err,
        message: 'Đăng nhâp người dùng không thành công!',
      });
    }
  }

  loginWithGoogle = async (req: Request, res: Response) => {
    const { name, email, photoURL } = req.body
    try {
      const user: any = await UserModel.findOne({ email: email })
      if (user) {
        const { password: pass, ...rest } = user._doc;
        return res.status(200).json({
          message: 'Đăng nhập thành công!',
          data: {
            rest,
            token: await getAccessToken({
              _id: user._id,
              email: user.email,
              rule: user.rule ?? 1,
            })
          }
        });
      }
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const generatedName = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4)
      const newUser: any = new UserModel({
        email: email,
        name: generatedName,
        password: hashedPassword,
        photoUrl: photoURL
      })
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      return res.status(200).json({
        message: 'Đăng nhập thành công!',
        data: {
          rest,
          token: await getAccessToken({
            _id: newUser._id,
            email: newUser.email,
            rule: newUser.rule ?? 1,
          })
        }
      })
    } catch (err: any) {
      return res.status(400).json({
        error: err,
        message: 'Đăng nhâp người dùng không thành công!',
      });
    }
  }
}

export const usersController = new UsersController();
