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
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const PORT = process.env.PORT || 3000
// app.use(session({
//   secret: process.env.secret,
//   resave: false,
//   saveUninitialized: false,  // Change to false to avoid empty sessions
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
//   }
// }));
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/oauth2/authorize", passport.authenticate("googleOauth"));

// // this is the callback called by google and here we need to initialize the session for our user with the jwt
// app.get(
//   "/oauth/google/callback",
//   // Initialize session middleware with configuration options
//   session({
//     resave: false,  // Prevents resaving session if not modified
//     saveUninitialized: false,  // Prevents saving uninitialized sessions
//     secret: process.env.PAYLOAD_SECRET || 'default_secret', // Secret for signing the session ID cookie
//     store: process.env.MONGODB_URI ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) : undefined, // Session store configuration
//   }),

//   // Passport middleware to handle OAuth2 authentication
//   passport.authenticate("googleOauth", { failureRedirect: "/login" }),

//   // Callback function executed after successful authentication
//   function (req, res) {
//     // Access configuration for the 'users' collection
//     const collectionConfig = payload.collections["users"].config;
    
//     // Select the fields from the user object to include in the JWT
//     let fieldsToSign = {
//       email: req.user.email,  // User's email
//       id: req.user.id,  // User's ID
//       collection: "users",  // Collection to which the user belongs
//     };

//     // Sign the JWT with selected fields
//     const token = jwt.sign(fieldsToSign, payload.secret, {
//       expiresIn: collectionConfig.auth.tokenExpiration,  // Set token expiration as per configuration
//     });

//     // Set a cookie in the response with the JWT
//     res.cookie(`${payload.config.cookiePrefix}-token`, token, {
//       path: "/",  // Cookie path
//       httpOnly: true,  // HttpOnly flag for security
//       expires: getCookieExpiration(collectionConfig.auth.tokenExpiration),  // Cookie expiration time
//       secure: collectionConfig.auth.cookies.secure,  // Secure flag (for HTTPS)
//       sameSite: collectionConfig.auth.cookies.sameSite,  // SameSite attribute
//       domain: collectionConfig.auth.cookies.domain || undefined,  // Cookie domain
//     });

//     // Redirect user to the admin dashboard after successful authentication
//     res.redirect("/admin");
//   }
// );

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