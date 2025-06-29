
 import userModel from "../models/userModel.js";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcryptjs";
 import validator from "validator";


 // Login User
 const loginUser = async ( req, res ) => {

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne( { email } )

        if (!user) {
            return res.json( { 

                success: false,
                message: "User does not exist"

             } )
        }

        const isMatch = await bcrypt.compare( password, user.password );

        if (!isMatch) {
            return res.json( { 

                success: false,
                message: "Invalid credentials"

             } )
        }


        const token = createToken( user._id );
        res.json( { 

            success: true,
            token

         } )


    } catch (error) {
        

        console.log(error);
        res.json( { 
            success: false,
            message: "Error in Login"
        } )

    }

 }

 const createToken = ( id ) => {
    return jwt.sign( { id }, process.env.JWT_SECRET )
 }

 // Register User

const registerUser = async ( req, res ) => {

    const { name, password, email } = req.body;

    try {

        // check if user already exists
        const exists = await userModel.findOne( { email } );

        if ( exists ) {

            return res.json( {
                success: false,
                message: "User already exists"
            } );

        }

        // validate email
        if ( !validator.isEmail( email ) ) {

            return res.json( {
                success: false,
                message: "Please Enter a valid Email Address"
            } );

        }

        // validate password length
        if ( password.length < 8 ) {

            return res.json( {
                success: false,
                message: "Password must be at least 8 characters long"
            } );

        }

        // hash the password
        const salt = await bcrypt.genSalt( 10 );

        const hashedPassword = await bcrypt.hash( password, salt );

        // create new user
        const newUser = new userModel( {
            name: name,
            email: email,
            password: hashedPassword
        } );

        const user = await newUser.save();

        // create token
        const token = createToken( user._id );

        return res.json( {
            success: true,
            token
        } );

    } catch ( error ) {

        console.log( error );

        return res.json( {
            success: false,
            message: "Error in Registration"
        } );

    }

}



 export { loginUser, registerUser };