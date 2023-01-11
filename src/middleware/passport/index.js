const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Users} = require('../../schema/user')

const {
    hashPassword,
    comparePassword
} = require('../../Utils/bcrypt')
const {
    Types
} = require('mongoose')


const {
    loggerDev,
    loggerProd
} = require('../../Utils/logger_config')

const NODE_ENV = process.env.NODE_ENV || "development";

const logger = NODE_ENV === "production" ?
    loggerDev :
    loggerProd

async function connectionPassport() {
    passport.use('login', new LocalStrategy(async (username, password, done) => {
        try {

            const user = await Users.findOne({
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
        passReqToCallback: true,
        usernameField: 'username',
        passwordField: 'password'
    }, async (req, username, password, done) => {
        const user = await Users.findOne({
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
        const {email,edad,direccion,telefono,avatar} = req.body
        console.log(email,edad,direccion,telefono,avatar);
        const newUser = new Users({
            username,
            password: hashedPassword,
            email,
            edad,
            direccion,  
            telefono,
            avatar
        });
        await newUser.save();
        return done(null, newUser); 
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        id = Types.ObjectId(id);
        const user = await Users.findOne(id)
        done(null, user)
    })
}


module.exports = connectionPassport