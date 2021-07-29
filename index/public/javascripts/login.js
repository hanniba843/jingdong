window.onload = function(){
    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click',()=>{
        window.history.back();
    })

    // 进入注册页面
    let fastregWrap = document.querySelector('.fastreg-wrap');
    fastregWrap.children[1].addEventListener('click',()=>{
        window.location.href = 'reg.html';
    })

    // 密码显示和隐藏
    let vanSwitch = document.querySelector('.van-switch');
    let password = document.querySelector('.password');
    let off;
    vanSwitch.addEventListener('click',()=>{
        if(off){
        vanSwitch.style.backgroundColor = 'rgb(235, 22, 37)';
        vanSwitch.children[0].style.transform = 'translateX(1em)';
        password.children[0].type = 'text';
        }else{
        vanSwitch.style.backgroundColor = '';
        vanSwitch.children[0].style.transform = '';
        password.children[0].type = 'password';
        }
       off =!off;
    })


    // 验证登录账户密码信息
    // var names = JSON.parse(localStorage.getItem('names'));
    // $('.sure-btn')[0].onclick = function(){
    //     // 判断有无手机号
    //     if($('.code-wrap input')[0].value.length==0){
    //         $('.van-toast')[0].style.display = 'block';
    //         $('.van-toast')[0].children[0].innerHTML = '请输入手机号';
    //         setTimeout(function(){
    //             $('.van-toast')[0].style.display = 'none';
    //             $('.van-toast')[0].children[0].innerHTML = '';
    //         },1500)
    //     }else if($('.code-wrap input')[0].value.length<11){
    //         // 判断是否大于11
    //         $('.van-toast')[0].style.display = 'block';
    //         $('.van-toast')[0].children[0].innerHTML = '您输入的手机号格式不正确';
    //         setTimeout(function(){
    //             $('.van-toast')[0].style.display = 'none';
    //             $('.van-toast')[0].children[0].innerHTML = '';
    //         },1500)
    //     }else{
    //         for(let i=0;i<names.length;i++){
    //             // 判断是否存在此用户
    //             if($('.code-wrap input')[0].value == names[i].name){
    //                 // 判断密码是否一致
    //                 if($('.password input')[0].value == names[i].pass){
    //                     localStorage.setItem('ok',1);
    //                     location.href = 'my.html';
    //                     break
    //                 }else{
    //                     $('.van-toast')[0].style.display = 'block';
    //                     $('.van-toast')[0].children[0].innerHTML = '您输入的用户名或密码不正确';
    //                     setTimeout(function(){
    //                         $('.van-toast')[0].style.display = 'none';
    //                         $('.van-toast')[0].children[0].innerHTML = '';
    //                     },1500)
    //                 }
    //                 break;
    //             }else{
    //                 $('.van-toast')[0].style.display = 'block';
    //                 $('.van-toast')[0].children[0].innerHTML = '您输入的用户名不存在';
    //                 setTimeout(function(){
    //                     $('.van-toast')[0].style.display = 'none';
    //                     $('.van-toast')[0].children[0].innerHTML = '';
    //                 },1500)
    //             }
    //         }
    //     }
    // }

    $('.sure-btn')[0].onclick = function(){
        if($('input')[0].value.length==0){
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '请输入手机号';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        }else if($('.code-wrap input')[0].value.length<11){
            // 判断是否大于11
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '您输入的手机号格式不正确';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        }else if($('input')[1].value.length==0||$('input')[1].value.length<6){
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '您输入的用户名或密码不正确';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        }else{
            axios({
                method:'post',
                url:'http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f',
                data:'cellphone='+$('input')[0].value+'&'+'password='+$('input')[1].value
            }).then((res) => {
                // console.log(res.data);
                // 判断用户名是否存在
                if(res.data.code ==303){
                    
                    $('.van-toast')[0].style.display = 'block';
                    $('.van-toast')[0].children[0].innerHTML = '您输入的用户名不存在';
                    setTimeout(function(){
                        $('.van-toast')[0].style.display = 'none';
                        $('.van-toast')[0].children[0].innerHTML = '';
                    },1500)
                } else{
                    localStorage.setItem('uid',res.data.data.uid);
                    localStorage.setItem('nickname',res.data.data.nickname);
                    localStorage.setItem('Token',res.data.data.auth_token);
                    localStorage.setItem('ok',1);
                    location.href = 'index.html';
                }
            });
        }

    }


   
}