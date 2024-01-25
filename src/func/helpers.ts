const Joi = require('joi')
const fs = require('fs')
const Crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Num = require('@supercharge/numbers')

require('dotenv').config()

export const validateVerifyOtp = (data: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  })
  return Joi.validate(data, schema)
}

export const generateRandomNumber = (length = 20) => {
  var randomNum = (
    Math.pow(10, length)
      .toString()
      .slice(length - 1) +
    Math.floor(Math.random() * Math.pow(10, length) + 1).toString()
  ).slice(-length)
  return randomNum
}

export const validateEmailData = (data: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  })
  return Joi.validate(data, schema)
}

export const validateRegisterData = (data: any) => {
  const schema = Joi.object().keys({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(8),
  })
  return Joi.validate(data, schema)
}

export const validateLoginData = (data: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    remember_me: Joi.boolean(),
  })

  return Joi.validate(data, schema)
}

export const setToken = (userData: any) => {
  var accessToken = jwt.sign(
    { userId: userData.id },
    process.env.APP_JWT,

    {
      algorithm: 'HS256',
    },
    {
      expiresIn: '1d', ////// expires in a day
    },
  )

  return accessToken
}

export const getTokenUser = (token: any) => {
  try {
    const decoded = jwt.verify(token, process.env.APP_JWT)
    return decoded.userId
  } catch (ex) {
    return 0
  }
}
