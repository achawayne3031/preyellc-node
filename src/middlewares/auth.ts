import { NextFunction } from 'express'
const jwt = require('jsonwebtoken')
import { errorRes } from '../response/error'

function userTokenAuth(req: any, res: any, next: any) {
  let currentTimeInMilliseconds = new Date()

  const token = req.header('Authorization')
  if (!token)
    return res
      .status(403)
      .send(
        errorRes(
          401,
          false,
          'Access denied. No authorization.',
          'Unauthorized',
        ),
      )

  try {
    const decoded = jwt.verify(token, process.env.APP_JWT)
    //  console.log(`${decoded.timeStamp} | ${currentTimeInMilliseconds.toLocaleString()}`);
    //  if(decoded.timeStamp == null || currentTimeInMilliseconds.toLocaleString() > decoded.timeStamp) return res.status(401).send(jsonError(401, false, 'Access denied. Token has expired.'));
    //  req.user = decoded;
    next()
  } catch (ex) {
    return res
      .status(400)
      .send(errorRes(400, false, 'Invalid token.', 'Unauthorized'))
  }
}

module.exports = userTokenAuth
