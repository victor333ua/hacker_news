import passport, { Profile } from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { prisma } from '../index';

const verify = async (accessToken: string, refreshToken: string, 
  profile: Profile, done: any) => {
  try {
    const socialUser = await prisma.federatedCredential.findFirst({
      where: { socialId: profile.id, provider: profile.provider },
      // include: { user: true }
    });
    if (socialUser) {
      done(null, { id: socialUser.userId })
    }
    else {
      if (!profile.emails) {
        done(null, false, { message: "user doesn't have email"});
        return;
      }  
    // check if any of profile's email exist in reg users in db  
      const promises = profile.emails!.map(async email => {
        return !!await prisma.user.findUnique({
          where: { email: email.value }
        });
      });
      const exists = await Promise.all(promises);
      const exist = exists.some(bool => bool);              
      if (exist) done(null, false, { message: 'user with such email already exist' });
      else {
        const { id } = await prisma.user.create({
          data: { 
            email: profile.emails![0].value,
            name: profile.name?.givenName,
            imageLink: profile.photos?.at(0)?.value
          }
        });
        await prisma.federatedCredential.create({
          data: { userId: id, provider: profile.provider, socialId: profile.id }
        });
        done(null, { id });
      }
    }
  } catch (err: any) {
      done(err);
  }
}

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_URI_REDIRECT as string,
      },
      (accessToken, refreshToken, profile, done) => {
        (async () => await verify(accessToken, refreshToken, profile, done))();
      }
  ));
    
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_URI_REDIRECT as string
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      (async () => await verify(accessToken, refreshToken, profile, done))();
    }
));

// Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  In a
  // production-quality application, this would typically be as simple as
  // supplying the user ID when serializing, and querying the user record by ID
  // from the database when deserializing.  However, due to the fact that this
  // example does not have a database, the complete Facebook profile is serialized
  // and deserialized.
  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });
  
  // passport.deserializeUser((id, done) => {
  //   UserModel.findOne({where: {id}}).then((user) => {
  //     done(null, user);
  //     return null;
  //   });
  // });
 
  // passport.serializeUser(function(user, cb) {
  //   cb(null, user);
  // });

  // passport.deserializeUser(function(user, cb) {
  //   cb(null, user as Express.User);
  // });