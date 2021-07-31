window.onload = function(){
     // 返回上一个页面
     $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })


    // 保存
    // console.log($('.main ul')[2].children[1].children[0].value =='');
    var arr =[];
    $('.submit-save')[0].addEventListener('click',function(){
        if($('.main ul')[2].children[1].children[0].value != ''){
            arr.push($('.main ul')[2].children[1].children[0].value)
            arr = arr[0].split(' ');
            // console.log(arr);

            // 添加地址接口
            axios({
                method:'post',
                url:'http://vueshop.glbuys.com/api/user/address/add?token=1ec949a15fb709370f',
                data:'uid='+localStorage.getItem('uid')+'&name='+$('input')[0].value+'&cellphone='+$('input')[1].value+'&province='+arr[0]+'&city='+arr[1]+'&area='+arr[2]+'&address='+$('input')[3].value+'&isdefault='+1
            }).then((res) => {
                // console.log(res.data);  
                $('.van-toast')[0].style.display = 'block';
                $('.van-toast')[0].children[0].innerHTML = '修改成功';
                setTimeout(function(){
                    $('.van-toast')[0].style.display = 'none';
                    $('.van-toast')[0].children[0].innerHTML = '';
                },3000)
            });
        }
    })
    
      
    $('.submit-save')[0].onclick = function(){
        // console.log($('.main ul').length);//获取每一项的输入内容
        // for(let i=0;i<$('.main ul').length-1;i++){
            
        //     if($('.main ul')[i].children[1].children[0].value.length != 0){
        //         arr.push($('.main ul')[i].children[1].children[0].value);
        //     }
        // }
        
        
    }
    
    
}