window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })
    $('.back')[1].addEventListener('click',()=>{
        window.history.back();
    })


    // 显示添加收获地址
    $('.add-btn')[0].onclick = function(){
        $('.page')[0].style.display = 'none';
        $('.page')[1].style.display = 'block';
    }

    // 保存
    var arr = [];
    $('.submit-save')[0].onclick = function(){
        // console.log($('.main ul')[0].children[1].children[0].value);//获取每一项的输入内容
        for(let i=0;i<$('.main ul').length-1;i++){
           arr.push($('.main ul')[i].children[1].children[0].value);
        }
        $('.van-toast')[0].style.display = 'block';
        $('.van-toast')[0].children[0].innerHTML = '修改成功';
        setTimeout(function(){
            $('.van-toast')[0].style.display = 'none';
            $('.van-toast')[0].children[0].innerHTML = '';
        },3000)
        console.log(arr);
    }
}