import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'
import express from 'express'
import payload from 'payload'
import { seed } from './payload/seed'
import { initializeTrackingCron } from './payload/cron/updateTrackingStatus'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const PORT = process.env.PORT || 3000

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      initializeTrackingCron()
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      await nextBuild(
        path.join(__dirname, '../'), // dir
        false,                       // reactProductionProfiling
        false,                       // debugOutput
        true,                        // runLint
        false,                       // noMangling
        false,                       // appDirOnly
        false,                       // turboNextBuild
        null,                        // turboNextBuildRoot
        'default'                    // buildMode
      )
      process.exit()
    })
    return
  }

  app.get('/api/images', async (req, res) => {
    try {
      const productId = req.query.productId as string;
      const products = await payload.findByID({
        id: productId,
        collection: "products"
      }) as { images?: { image: { url: string } }[] };
      const filteredProducts = products.images?.map(image => image.image.url);
      const finalImages = filteredProducts.map((e)=>{ 
        return e.replace('http://145.223.74.227', '')
      })
      res.json(finalImages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
    })
  })
}

start()