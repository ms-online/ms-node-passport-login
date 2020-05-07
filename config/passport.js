// 创建passport strategy

// 引入模块
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({
            usernameField:'email'
        }, (email, password, done)=>{
            // 匹配用户
            User.findOne({
                email:email
            }).then(user => {
                if(!user){
                    return done(null, false, {message:"该邮箱未注册，用户不存在"});
                }

                // 匹配密码
                bcrypt.compare(password,user.password,(err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: '密码错误'})
                    }
                })
            })
        })
    )
// 序列化和反序列化
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}