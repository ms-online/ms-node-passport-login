// 引入模块
const express = require('express');
const router = express.Router();

router.get('/login', (req,res) => res.render('login'));
router.get('/register', (req,res) => res.render('register'));

// 注册页
router.post('/register', (req, res) => {
    // console.log(req.body)
    // res.send('hello');

    const {name, email, password, password2} = req.body;
    // 创建错误数组
    let errors = [];

    // 验证所有内容是否填写
    if(!name || ! email || !password||!password2){
        errors.push({msg: "请输入所有内容"});
    }

    // 验证密码是否匹配
    if(password != password2){
        errors.push({msg: "密码不匹配"});
    }

    // 验证密码长度
    if(password.length < 6){
        errors.push({msg: "密码至少6个字符"});
    }

    // 验证是否有错误，有就提示，没有就通过
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        res.send('注册成功！')
    }
})

module.exports = router;