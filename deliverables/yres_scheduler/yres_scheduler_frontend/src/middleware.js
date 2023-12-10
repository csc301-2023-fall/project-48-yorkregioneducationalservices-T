export { default } from "next-auth/middleware"
export const config = {
    matcher: [
      /*
       * This will protect all routes EXCEPT the login page,
       * favicon, and logo for the login page
       */
      '/((?!login|favicon.ico|YRESLOGONEW.webp).*)',
    ],
  }