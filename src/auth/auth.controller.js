import { loginLocalUser } from "./auth.service.js";

export const loginLocalUserController = async (req, res) => {
    try {
        const {email, password} = req.body;
        const token_jwt = await loginLocalUser(email,password);
        res.status(500).json({token_jwt});
    } catch (error) {
        res.status(500).json({msg: 'Login false'});
    }
}