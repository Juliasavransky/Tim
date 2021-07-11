const express = require('express')
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

//Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//middleware for connect
app.use(cors());


app.get('/', (req, res) => res.send('API testing'));

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/orders', require('./routes/api/orders'));




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));

