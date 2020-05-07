// 引入模块
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// 加载用户信息model
const User = require('../models/user');

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
        // 验证邮箱是否存在
        User.findOne({email:email}).then(user => {
            if(user){
                // 用户和邮箱已经存在
                errors.push({msg:"邮箱已经存在"});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                // 创建新用户
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // console.log(newUser);
                // res.send('hello')

                // 加密密码
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // 设置密码为hash
                        newUser.password = hash;
                        // 保存新用户到DB
                        newUser.save().then(user => {
                            // 用户注册成功后重定向到login
                            res.redirect('/users/login');
                        }).catch(err => console.log(err));
                    })
                })
            }
        })
    }
})

module.exports = router;