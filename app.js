// 引入模块
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

// 设置ejs
app.use(expressLayouts);
app.set("view engine", "ejs")

// DB config
const db = require('./config/keys').mongoURI;

// 连接数据库
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true}).then(()=> console.log('MongoDB已经连接...')).catch(err => console.log(err));

// body parser 对请求数据进行解析
app.use(express.urlencoded({extended:false}));

// router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`服务器已经在${PORT}端口号运行...`));