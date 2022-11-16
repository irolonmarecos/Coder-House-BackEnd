const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schema/user')
const {hashPassword, comparePassword} = require('../Utils/bcrypt')
const {Types} = require('mongoose')
const Usuario = require('../schema/user');
const { envioMail } = require('../Utils/nodeMailer')
const {msjWht} = require('../Utils/twilio')

async function connectionPassport (){
    passport.use('login',  new LocalStrategy(async(username, password, done)=>{
        try{
            const user = await Usuario.findOne({username})
            if(!user || !comparePassword(user,password)){
                console.log(comparePassword(user,password));
                return done(null,false,{mensaje:'Usuario no encontrado'})
            } else{
                return done(null, user)
            }
        
        }catch(err){
            done(err)
        }
    }))
    
    
    passport.use('signup', new LocalStrategy({
        passReqToCallback:true
    }, async (req,username,password,done)=>{
        const user = await Usuario.findOne({username})
        const confirmPass = req.body.confirmPassword
        const nombre = req.body.nombre;
        const edad = req.body.edad;
        const direccion = req.body.direccion;
        const telefono = req.body.telefono;
        const avatar = req.body.avatar;
        let carrito = [];

        console.log(await nombre);
        if(user){
            return done(null, false, {mensaje:' Usuario ya existe'})
        }else if(password !== confirmPass){
            return done(null, false, {mensaje:' Contraseña no Coincide'})
        }

        carrito.push({ID:1,producto:'coca-cola',descripcion:'Bebida',precio:100,foto:'foto'})

        const hashedPassword = hashPassword(password);
        const newUser = new User({ username, password: hashedPassword, nombre, edad, direccion, telefono, avatar,carrito});
        console.log(newUser);
        envioMail(nombre)
        msjWht(nombre)
        await newUser.save();   
        return done(null, newUser);
    }))
    
    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });
    
    passport.deserializeUser(async(id,done)=>{
        id = Types.ObjectId(id);
        const user = await User.findOne(id)
        done(null, user)
    })
}


module.exports = connectionPassport