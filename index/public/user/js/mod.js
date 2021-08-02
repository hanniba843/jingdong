window.onload = function(){
    // 返回上一个页面
    $('.back')[0].addEventListener('click',()=>{
        window.history.back();
    })


    // 删除地址
    // console.log(location.search.split('=')[1]);
    $('.right-btn')[0].onclick =function(){
        axios({
            url:'http://vueshop.glbuys.com//api/user/address/del?uid='+localStorage.getItem('uid')+'&aid='+location.search.split('=')[1]+'&token=1ec949a15fb709370f'
        }).then((res) => {
            // console.log(res.data);
            $('.van-toast')[0].style.display = 'block';
            $('.van-toast')[0].children[0].innerHTML = res.data.data;
            setTimeout(function(){
                $('.van-toast')[0].style.display = 'none';
                $('.van-toast')[0].children[0].innerHTML = '';
            },1500)
        });
    }

    // 获取地址信息
    axios({
        url:'http://vueshop.glbuys.com//api/user/address/info?uid='+localStorage.getItem('uid')+'&aid='+location.search.split('=')[1]+'&token=1ec949a15fb709370f'
    }).then((res) => {
        console.log(res.data);
       if(res.data.code!=303){
            $('input')[0].value = res.data.data.name;
            $('input')[1].value = res.data.data.cellphone;
            $('input')[2].value = res.data.data.province+' '+res.data.data.city+' '+res.data.data.area;
            $('input')[3].value = res.data.data.address;
       }
        

        // console.log($('input')[2].value.split(' '));

        $('button')[0].onclick = function(){
            // console.log(res);
            // 修改地址
        axios({
                method:'post',
                url:'http://vueshop.glbuys.com//api/user/address/mod?token=1ec949a15fb709370f',
                data:'aid='+location.search.split('=')[1]+'&uid='+localStorage.getItem('uid')+'&name='+$('input')[0].value+'&cellphone='+$('input')[1].value+'&province='+$('input')[2].value.split(' ')[0]+'&city='+$('input')[2].value.split(' ')[1]+'&area='+$('input')[2].value.split(' ')[2]+'&address='+$('input')[3].value+'&isdefault=1'
            }).then((res) => {
                // console.log(res.data.data);  
                $('.van-toast')[0].style.display = 'block';
                $('.van-toast')[0].children[0].innerHTML = res.data.data;
                setTimeout(function(){
                    $('.van-toast')[0].style.display = 'none';
                    $('.van-toast')[0].children[0].innerHTML = '';
                },1500)
            });
        }
    });

    
}