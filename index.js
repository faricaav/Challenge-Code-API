//import
const express = require('express');
const cors = require('cors');

//implementasi
const app = express();
app.use(cors());

//endpoint
//endpoint admin
const admin = require('./routes/admin');
app.use("/admin", admin)

//endpoint guest
const guest = require('./routes/guest');
app.use("/guest", guest)

//endpoint guest
const guest_note = require('./routes/guest_note');
app.use("/guestnote", guest_note)

//endpoint login
const login = require('./routes/login');
app.use("/login", login)

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})
