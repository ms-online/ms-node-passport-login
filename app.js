// 引入模块
const express = require('express');

const app = express();

// router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`服务器已经在${PORT}端口号运行...`));