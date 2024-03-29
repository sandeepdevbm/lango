import jwt from "jsonwebtoken"
import { authHelper } from "../Helpers/authHelper.js"
import { imageUpload } from '../multer/multer.js'

const authHelpers = new authHelper();
const {
    doSignup, doLogin, getMentor, getDetails
} = authHelpers;

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: maxAge
    })
}

//REGISTER USER

export const userSignup = async (req, res) => {
    try {
        const upload = await imageUpload(req, res)
        const imageName = await upload(req, res)
        const formState = JSON.parse(req.body.formState);
        const firstName = formState.firstName;
        const lastName = formState.lastName;
        const phoneNumber = formState.phoneNumber;
        const email = formState.email;
        const password = formState.password;
        const role = formState.role;
        const Details = {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            role,
            qualification: req.body.qualification,
            language: req.body.language,
            profilePicture: imageName
        }
        const response = await doSignup(Details)
        if (response._id) {
            const token = createToken(response._id)
            res.cookie("token", token, { httpOnly: true });
            res.status(201).json({ response: response })
        } else {
            res.status(201).json({ response: response })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

export const userLogin = async (req, res) => {
    try {
        const response = await doLogin(req.body)
        const token = createToken(response._id)
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ response: response, token })
    } catch (err) {
        res.status(400).json({ err })
    }
}