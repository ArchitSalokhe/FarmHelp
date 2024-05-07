import express from 'express'
import User from '../models/usermodel.js'

const router = express.Router();

router.post('/signup', async (req, res) =>{
    try {
        const { email, password, name } = req.body;
        
        const query = await User.find({ email: email}).exec();
        if (query.length !==0) {
            return res.status(401).json("User already exists");
        }
        const user = new User({email, name, password});
        const newUser = await user.save();

        res.status(200).json({
            cred: {
                user: newUser
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server error")
    }
});

//login route
router.post("/login", async (req, res) =>{
    try{
        const { email, password } = req.body;

        let user;
        user = await User.find({email: email}).exec();

        if(user.length === 0 ) {
            return res.status(401).json("email or Password is incorrect");
        }

        if(password != user[0].password){
            return res.status(401).json ("email or password is incorrect");
        }

        res.status(201).json({
            cred: {
                user: user[0]
            }
        });
    }catch (err){
        console.error(err.message);
        res.status(500).json("server error");
    }
});

export default router;
