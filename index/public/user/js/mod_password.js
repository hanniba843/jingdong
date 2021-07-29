window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })

    // 密码显示和隐藏
    let vanSwitch = document.querySelector('.van-switch');
    let password = document.querySelector('.password');
    let off;
    vanSwitch.addEventListener('click',()=>{
        if(off){
        vanSwitch.style.backgroundColor = 'rgb(235, 22, 37)';
        vanSwitch.children[0].style.transform = 'translateX(1em)';
        password.type = 'text';
        }else{
        vanSwitch.style.backgroundColor = '';
        vanSwitch.children[0].style.transform = '';
        password.type = 'password';
        }
       off =!off;
    })

    // 修改密码
    let uid = localStorage.getItem('uid');
    $('.save-btn')[0].onclick = function(){
        if($('.password')[0].value.length ==0){
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '请输入密码';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        }else if($('.password')[0].value.length<6){
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = '密码不能小于6位';
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        }else{
            axios({
                method:'post',
                url:'http://vueshop.glbuys.com/api/user/myinfo/modpwd?token=1ec949a15fb709370f',
                data: 'uid='+uid+'&password='+$('.password')[0].value
            }).then((res) => {
                location.href = 'http://127.0.0.1:8000/my.html'
            });
        }
       
    }
}