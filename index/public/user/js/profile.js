window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
       window.history.back();
    }) 


    // 点击保存
    $('.right-btn')[0].onclick = function(){
        $('.van-toast')[0].style.display = 'block';
        $('.van-toast')[0].children[0].innerHTML = '修改成功';
        setTimeout(function(){
            $('.van-toast')[0].style.display = 'none';
            $('.van-toast')[0].children[0].innerHTML = '';
        },3000)
    }


}