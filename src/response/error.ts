export const errorRes = (
  status: number,
  success: boolean,
  message: string,
  data: any,
) => {
  return { status: status, success: success, message: message, data: data }
}

// module.exports = errorRes
