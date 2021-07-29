window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })

    // 修改会员手机号
    let uid = localStorage.getItem('uid');
    $('.save-btn')[0].onclick = function(){
        if($('.code')[0].value.length==0){
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '请输入验证码';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        }else{
            axios({
                method:'post',
                url:'http://vueshop.glbuys.com//api/user/myinfo/updatecellphone?token=1ec949a15fb709370f',
                data:"uid="+uid+"&cellphone="+$('.cellphone')[0].value
            }).then((res) => {
                console.log(res.data);
                if(res.data.code ==302){
                    $('.van-toast')[0].style.display = 'block';
                    $('.van-toast')[0].children[0].innerHTML = '此手机号已注册过，请更换手机号';
                    setTimeout(function(){
                        $('.van-toast')[0].style.display = 'none';
                        $('.van-toast')[0].children[0].innerHTML = '';
                    },1500)
                }else{
                    window.location.href = 'http://127.0.0.1:8000/my.html';
                }
            });
        }
    }

    // 定时器
    let timer;
    
    $('.code-btn')[0].onclick = function(){
        let num = 10;
        clearInterval(timer);
        timer = setInterval(function(){
            $('.code-btn')[0].innerHTML = '重新获取('+num+')';
            if(num ==0){
                clearInterval(timer);
                $('.code-btn')[0].innerHTML = '获取验证码';
            }
            num--;
        },500)
    }
    
}