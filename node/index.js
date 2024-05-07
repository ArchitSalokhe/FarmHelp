import express from 'express';
import cors from 'cors';
import connectDB from './dbconnect.js';
import UserAuthRoute from './routes/userAuth.js'

const app = express();
const PORT = 3001 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

await connectDB(); 

// app.post('/register', (req, res) => {
//     UserModel.create(req.body)
//     .then(Farmhelp => res.json(Farmhelp))
//     .catch(err => res.json(err))
// })

app.get('/', (req, res) => {
    return res.json({
        status: true,
        message: 'node-server working properly.'
    })
})

app.use('/auth', UserAuthRoute);

app.listen(PORT, () => {
    console.log('Listening on Port 3001');
})