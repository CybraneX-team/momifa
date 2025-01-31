import OAuth2Strategy from "passport-oauth2";
import axios from "axios";
import payload from 'payload';
import crypto from 'crypto';
require("dotenv").config();


const GoogleOAuthStrategy = new OAuth2Strategy({   
    authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile",
    tokenURL: "https://accounts.google.com/o/oauth2/token",
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL: `${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.GOOGLE_CALLBACK_URL}`, 
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      const userProfileURL = "https://www.googleapis.com/oauth2/v3/userinfo";
      const response = await axios.get(userProfileURL, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const userData = response.data;
      console.log("user ka data", userData)
      // Extract necessary data from user profile
      const email = userData.email;
      const sub = userData.sub;
      const pictureUrl = userData.picture;
      const name = userData.name;
      const collectionSlug = "users";

      let user = await findOrCreateUser(collectionSlug, sub, email, pictureUrl, name);

      cb(null, user);
    } catch (e) {
      console.error('Authentication failed:', e);
      cb(e);
    }
  }
);

async function findOrCreateUser(collectionSlug, sub, email, pictureUrl, name) {
  let users = await payload.find({
    collection: collectionSlug,
    where: { sub: { equals: sub } },
    showHiddenFields: true,
  });

  if (users.docs && users.docs.length) {
    let user = users.docs[0];
    user.collection = collectionSlug;
    user._strategy = "googleOauth";
    return user;
  } else {
    const randomPassword = crypto.randomBytes(20).toString('hex');

    return await payload.create({
      collection: collectionSlug,
      data: {
        name: name,
        email: email,
        sub: sub,
        pictureURL: pictureUrl,
        password: randomPassword,
      },
      showHiddenFields: true,
    });
  }
}

export default GoogleOAuthStrategy;