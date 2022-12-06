const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../schema/user')
const {
    hashPassword,
    comparePassword
} = require('../../Utils/bcrypt')
const {
    Types
} = require('mongoose')
const Usuario = require('../../schema/user');

const {
    loggerDev,
    loggerProd
} = require('../../../logger_config')

const NODE_ENV = process.env.NODE_ENV || "development";

const logger = NODE_ENV === "production" ?
    loggerDev :
    loggerProd

async function connectionPassport() {
    passport.use('login', new LocalStrategy(async (username, password, done) => {
        try {
            const user = await Usuario.findOne({
                username
            })
            if (!user || !comparePassword(user, password)) {
                logger.log("info", `Usuario o contraseña Incorrectos`)
                return done(null, false, {
                    mensaje: 'Usuario no encontrado'
                })
            } else {
                return done(null, user)
            }

        } catch (err) {
            done(err)
        }
    }))


    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        const user = await Usuario.findOne({
            username
        })
        const confirmPass = req.body.confirmPassword
        if (user) {
            return done(null, false, {
                mensaje: ' Usuario ya existe'
            })
        } else if (password !== confirmPass) {
            return done(null, false, {
                mensaje: ' Contraseña no Coincide'
            })
        }
        const hashedPassword = hashPassword(password);
        const newUser = new User({
            username,
            password: hashedPassword
        });
        console.log(newUser);
        await newUser.save();
        return done(null, newUser);
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        id = Types.ObjectId(id);
        const user = await User.findOne(id)
        done(null, user)
    })
}


module.exports = connectionPassport