const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("../prisma/client");
const { generateToken } = require("../utils/jwt");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email,
              provider: "GOOGLE",
              isVerified: true,
            },
          });
        }

        const token = generateToken({
          id: user.id,
          role: user.role,
        });

        return done(null, { token, user });

      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
