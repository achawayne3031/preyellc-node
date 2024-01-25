import { errorRes } from '../response/error'
import { successRes } from '../response/success'
import { Request, Response } from 'express'
import { AppSequelize } from '../database/datab'
import User from '../entity/user'
const jwt = require('jsonwebtoken')

const DashboardController = {
  allUsers: async (req: Request, res: Response) => {
    try {
      AppSequelize.authenticate()
      const userRepo = AppSequelize.getRepository(User)
      const userData = await userRepo.findAll()

      return res.send(successRes(200, true, 'All users', userData, '', []))
    } catch (error) {
      return res.status(400).send(errorRes(400, false, 'Server error', error))
    }
  },
}

module.exports = DashboardController
