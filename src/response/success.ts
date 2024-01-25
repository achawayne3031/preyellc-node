export const successRes = (
    status: number,
    success: boolean,
    message: string,
    data: any,
    token: string,
    debug: any
  ) => {
    return { status: status, success: success, message: message, data: data, token: token, debug: debug }
  }
  
  