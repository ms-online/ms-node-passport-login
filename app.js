// 引入模块
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// 设置ejs
app.use(expressLayouts);
app.set("view engine", "ejs")

// router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`服务器已经在${PORT}端口号运行...`));