const fs = require('fs')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
import { errorRes } from '../response/error'
import { successRes } from '../response/success'
import { Request, Response } from 'express'
import { AppSequelize } from '../database/datab'
import User from '../entity/user'

const {
  validateLoginData,
  setToken,
  validateRegisterData,
  generateRandomNumber,
  validateVerifyOtp,
  validateEmailData,
} = require('../func/helpers')

const AuthController = {
  resetOtp: async (req: Request, res: Response) => {
    try {
      const { error } = validateEmailData(req.body)
      if (error) {
        return res
          .status(403)
          .send(
            errorRes(403, false, 'Validation error.', error.details[0].message),
          )
      }

      AppSequelize.authenticate()
      const userRepo = AppSequelize.getRepository(User)

      const userData = await userRepo.findOne({
        where: { email: req.body.email },
      })

      if (userData === null) {
        return res.status(403).send(errorRes(403, false, 'Invalid user', []))
      }

      if (userData?.isVerified == 1) {
        return res
          .status(403)
          .send(errorRes(403, false, 'Account has been verified already', []))
      }

      let newOtp = generateRandomNumber(6)

      await userRepo.update(
        { otp: newOtp },
        {
          where: {
            email: req.body.email,
          },
        },
      )

      return res.send(
        successRes(200, true, 'Otp reset was successful', [], newOtp, []),
      )
    } catch (error) {
      return res.status(400).send(errorRes(400, false, 'Server error', error))
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    try {
      const { error } = validateVerifyOtp(req.body)
      if (error) {
        return res
          .status(403)
          .send(
            errorRes(403, false, 'Validation error.', error.details[0].message),
          )
      }

      let email = req.body.email
      let passcode = req.body.passcode

      AppSequelize.authenticate()
      const userRepo = AppSequelize.getRepository(User)

      const userData = await userRepo.findOne({
        where: { email: req.body.email },
      })

      if (userData === null) {
        return res.status(403).send(errorRes(403, false, 'Invalid user', []))
      }

      if (userData?.isVerified == 1) {
        return res
          .status(403)
          .send(errorRes(403, false, 'Account has been verified already', []))
      }

      if (userData?.otp != req.body.otp) {
        return res.status(403).send(errorRes(403, false, 'Invalid code', []))
      }

      await userRepo.update(
        { isVerified: 1, otp: '0' },
        {
          where: {
            email: req.body.email,
          },
        },
      )

      return res.send(
        successRes(200, true, 'Verification successful', [], '', []),
      )
    } catch (error) {
      return res.status(400).send(errorRes(400, false, 'Server error', error))
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { error } = validateLoginData(req.body)
      if (error) {
        return res
          .status(403)
          .send(
            errorRes(403, false, 'Validation error.', error.details[0].message),
          )
      }

      AppSequelize.authenticate()
      const userRepo = AppSequelize.getRepository(User)

      const userData = await userRepo.findOne({
        where: { email: req.body.email },
      })

      if (userData === null) {
        return res.status(403).send(errorRes(403, false, 'Invalid user', []))
      }

      const dbPassword = userData?.password
      let verify = passwordHash.verify(req.body.password, dbPassword)

      if (verify) {
        let accessToken = setToken(userData)
        return res.send(
          successRes(
            200,
            true,
            'Login was successful',
            userData,
            accessToken,
            [],
          ),
        )
      } else {
        return res
          .status(403)
          .send(errorRes(403, false, 'Invalid login credentials', []))
      }
    } catch (error) {
      return res.status(400).send(errorRes(400, false, 'Server error', error))
    }
  },

  register: async (req: Request, res: Response) => {
    //// res.set('Access-Control-Allow-Origin', '*')

    try {
      const { error } = validateRegisterData(req.body)
      if (error) {
        return res
          .status(403)
          .send(
            errorRes(403, false, 'Validation error.', error.details[0].message),
          )
      }

      AppSequelize.authenticate()
      const userRepo = AppSequelize.getRepository(User)

      const userData = await userRepo.findOne({
        where: { email: req.body.email },
      })

      if (userData != null) {
        return res
          .status(403)
          .send(errorRes(403, false, 'Email have been registered already', []))
      }

      let hashedPassword = passwordHash.generate(req.body.password)
      const userRepository = AppSequelize.getRepository(User)
      await userRepository.create({
        full_name: req.body.full_name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        otp: '463291',
      })

      return res.send(
        successRes(200, true, 'Registration was successful', [], '', []),
      )
    } catch (error) {
      return res.status(400).send(errorRes(400, false, 'Server error', error))
    }
  },
}

module.exports = AuthController
