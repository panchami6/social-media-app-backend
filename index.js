const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const postsRouter = require("./routes/posts.router")
const { initializeDBConnection } = require("./db/db.connect.js")

const app = express();

app.use(cors())
app.use(bodyParser.json())

initializeDBConnection();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});