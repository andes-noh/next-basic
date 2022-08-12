import { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
}

const handler: NextApiHandler = async (req, res) => {
  // https://github.com/stegano/next-http-proxy-middleware
  return httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: process.env.API_SERVER_URL,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
    pathRewrite: [
      {
        patternStr: '^/api',
        replaceStr: '',
      },
    ],
  })
}

export default handler
