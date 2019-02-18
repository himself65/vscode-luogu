export const isDev = process.env.NODE_ENV === 'development'

export function debug (message?: any, ...optionalParams: any[]) {
  if (isDev) {
    console.log(message, ...optionalParams)
  }
}

export default debug
