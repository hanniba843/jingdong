window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
       window.history.back();
    }) 


    // 点击保存
    $('.right-btn')[0].onclick = function(){
        localStorage.setItem('nickname',$('input')[1].value);
        axios({
            method:'post',
            url:'http://vueshop.glbuys.com//api/user/myinfo/updateuser?token=1ec949a15fb709370f',
            data: 'uid='+localStorage.getItem('uid')+'&nickname='+$('input')[1].value+'&gender='+1
        }).then((res) => {
            if($('input')[1].value.length!=0){
                $('.van-toast')[0].style.display = 'block';
                $('.van-toast')[0].children[0].innerHTML = res.data.data;
                setTimeout(function(){
                    $('.van-toast')[0].style.display = 'none';
                    $('.van-toast')[0].children[0].innerHTML = '';
                },3000)
            }else{
                $('.van-toast')[0].style.display = 'block';
                $('.van-toast')[0].children[0].innerHTML = res.data.data;
                setTimeout(function(){
                    $('.van-toast')[0].style.display = 'none';
                    $('.van-toast')[0].children[0].innerHTML = '';
                },3000)
            }
            
        });
    }

    // 修改名字
    // console.log($('input')[1]);
    $('input')[1].value = localStorage.getItem('nickname');



}