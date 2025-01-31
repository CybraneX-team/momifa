import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'
import express from 'express'
import payload from 'payload'
import { seed } from './payload/seed'
import { initializeTrackingCron } from './payload/cron/updateTrackingStatus'
import { decodeDataToLogin, sendMail } from './payload/utilities/nodemailer'
import {sendVerificationMail} from './payload/utilities/nodemailer'
import getCookieExpiration from 'payload/dist/utilities/getCookieExpiration'
import MongoStore from 'connect-mongo'
import passport from "passport";
import session from "express-session";
import jwt from "jsonwebtoken";
import GoogleOAuthStrategy from './authStrageties/GoogleOAuthStrategy';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const PORT = process.env.PORT || 3000

app.get("/oauth2/authorize", passport.authenticate("googleOauth"));
app.get(
  "/oauth/google/callback",
  session({
    resave: false,  
    saveUninitialized: false,  
    secret: process.env.PAYLOAD_SECRET || 'default_secret', 
    store: process.env.MONGODB_URI ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) : undefined, 
  }),

  
  passport.authenticate("googleOauth", { failureRedirect: "/login" }),

 
  function (req : any , res) {
    
    const collectionConfig = payload.collections["users"].config;
    
    
    let fieldsToSign = {
      email: req.user.email, 
      id: req.user.id,  
      collection: "users", 
    };

    
    const token = jwt.sign(fieldsToSign, payload.secret, {
      expiresIn: collectionConfig.auth.tokenExpiration,  
    });

    
    res.cookie(`${payload.config.cookiePrefix}-token`, token, {
      path: "/",  
      httpOnly: true,  
      expires: getCookieExpiration(collectionConfig.auth.tokenExpiration),  
      secure: collectionConfig.auth.cookies.secure,  
      sameSite: collectionConfig.auth.cookies.sameSite,  
      domain: collectionConfig.auth.cookies.domain || undefined,  
    });

   
    res.redirect("/");
  }
);

const start = async (): Promise<void> => {
  await payload.init(
    {
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      initializeTrackingCron()
    },
    email: {
      transportOptions : {
        host: "smtp.gmail.com" ,
        auth: {
          user: "trishbatra564@gmail.com" ,
          pass : "iwgbvrdvdsahpztj"
        },
        port: 587 ,
        secure: false,
        requireTLS: true,
        tls: {
          rejectUnauthorized: false
        }
      },
      fromName: "MOMIFA",
      fromAddress: "momifa.com"
    }
  }
)
  
  passport.use("googleOauth",GoogleOAuthStrategy);


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await payload.findByID({ collection: "users", id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
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
      const productId = req.query.productId as string | undefined;
  
      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }
  
      const products = await payload.findByID({
        id: productId,
        collection: "products",
      }).catch(err => null); 
  
      if (!products) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const filteredProducts = products.images?.map(image => image.image.url) || [];
      const finalImages = filteredProducts.map((url) => {
        if (url.includes(`${process.env.NEXT_PUBLIC_SERVER_URL}/media/`)) {
          return url.replace(`${process.env.NEXT_PUBLIC_SERVER_URL}/media/`, "");
        } else if (url.includes("http://localhost:3000/media/")) {
          return url.replace("http://localhost:3000/media/", "");
        }
        return url; 
      });
      res.json(finalImages);
    } catch (error) {
      console.error("Error fetching product images:", error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });
  
  app.post('/api/mailContactUs',  sendMail)
  app.post("/api/verificationMail",sendVerificationMail)
  app.post("/api/decodedData", decodeDataToLogin)
 
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