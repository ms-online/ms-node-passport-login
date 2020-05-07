// 引入模块
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

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

// 设置express session 中间件
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))

// 设置connect flash
app.use(flash());

// 设置全局变量显示闪存提示
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`服务器已经在${PORT}端口号运行...`));