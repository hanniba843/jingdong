window.onload = function(){
    // 获取随机验证码
    var vcodeImg = document.querySelector('.vcode-img');
    var vcodeImgchilren = vcodeImg.children[0];
    vcodeImgchilren.addEventListener('click', function () {
        var xhr = new XMLHttpRequest()
        xhr.open("POST", "http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f")
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                vcodeImgchilren.src = xhr.responseURL
            }
        }
    })

    // 手机号验证
    var cellphone = document.querySelector('.cellphone');
    var cellphonechilren = cellphone.children[0];
    var codeBtn  = document.querySelector('.code-btn');
    let vanToast = document.querySelector('.van-toast');
    // 输入验证码
   
    let inputs = document.querySelector('.inputs');
    // console.log(inputs.children[0].value);
    cellphonechilren.addEventListener('keyup',function(){
        if(cellphonechilren.value.length==11){
            codeBtn.setAttribute('class','success code-btn');
            let timer;
            let num = 10;
            codeBtn.addEventListener('click',()=>{ 
                // console.log($('.inputs input')[0].value);//获取验证码
                if($('.inputs input')[0].value!= ''){
                    // 设置样式
                    codeBtn.style.bakcground = '#eaeaea';
                    codeBtn.style.border = 'none';
                    codeBtn.style.color = '#717376';
                    // 定时器
                    clearInterval(timer);
                    timer = setInterval(function(){
                        codeBtn.innerHTML = '重新获取('+num+')';
                        if(num ==0){
                            clearInterval(timer);
                            codeBtn.innerHTML = '获取验证码';
                            codeBtn.style.bakcground = '#fff';
                            codeBtn.style.border = '1px solid #eb1625';
                            codeBtn.style.color = '#eb1625';
                        }
                        num--;
                    },500)
                }else{
                    vanToast.style.display = 'block';
                    vanToast.children[0].innerHTML = '请输入图文验证码';
                    setTimeout(function(){
                        vanToast.style.display = 'none';
                        vanToast.children[0].innerHTML = '';
                    },3000)
                } 
            })
        }else{
            codeBtn.setAttribute('class','code-btn');
        }
    })

    // 点击注册 判断
    // console.log($('.sure-btn')[0]);//获取按钮
    // var arr= {};
    // $('.sure-btn')[0].onclick = function(){
    //     if($('.cellphone input')[0].value.length==11){
    //         if($('.code-wrap input')[0].value != ''){
    //             if($('.password input')[0].value ==''){
    //                 vanToast.style.display = 'block';
    //                 vanToast.children[0].innerHTML = '请输入密码';
    //                 setTimeout(function(){
    //                     vanToast.style.display = 'none';
    //                     vanToast.children[0].innerHTML = '';
    //                 },1500)
    //             }else if($('.password input')[0].value.length <6){
    //                 vanToast.style.display = 'block';
    //                 vanToast.children[0].innerHTML = '密码必须大于等于6位';
    //                 setTimeout(function(){
    //                     vanToast.style.display = 'none';
    //                     vanToast.children[0].innerHTML = '';
    //                 },1500)
    //             }else{
    //                 // 注册成功
    //                 // console.log($('.cellphone input')[0].value);
    //                 // console.log($('.password input')[0].value);
    //                 arr={
    //                    'name': $('.cellphone input')[0].value,
    //                    'pass': $('.password input')[0].value
    //                 };
    //                  // 存储账号密码
    //                 let obj = [];
    //                 if(localStorage.getItem('names')){
    //                     let aobj = JSON.parse(localStorage.getItem('names'));
    //                     for(let i=0;i<aobj.length;i++){
    //                         obj.push(aobj[i]);
    //                     }
    //                 }
    //                 obj.push(arr);
    //                 // 数组对象去重
    //                 function distinct2(arr) {
    //                     var newArr = [];
    //                     for (var i = 0; i < arr.length; i++) {
    //                         var flag = true;
    //                         for (var j = 0; j < newArr.length; j++) {
    //                             if (arr[i].name == newArr[j].name) {
    //                                 flag = false;
    //                                 vanToast.style.display = 'block';
    //                                 vanToast.children[0].innerHTML = '此手机号已注册过，请更换手机号';
    //                                 setTimeout(function(){
    //                                     vanToast.style.display = 'none';
    //                                     vanToast.children[0].innerHTML = '';
    //                                 },1500)
    //                                 break
    //                             };
    //                         };
    //                         if (flag) {
    //                             newArr.push(arr[i]);
    //                         };
    //                     };
    //                     if(flag){
    //                         location.href = 'login.html';
    //                     }else{
                            
    //                     }
    //                     return newArr;
    //                 }
    //                 obj = distinct2(obj);
    //                 localStorage.setItem('names',JSON.stringify(obj));
    //             }
    //         }else{
    //             vanToast.style.display = 'block';
    //             vanToast.children[0].innerHTML = '请输入短信验证码';
    //             setTimeout(function(){
    //                 vanToast.style.display = 'none';
    //                 vanToast.children[0].innerHTML = '';
    //             },1500)
    //         }
    //     }else{
    //         vanToast.style.display = 'block';
    //         vanToast.children[0].innerHTML = '您输入的手机号格式不正确';
    //         setTimeout(function(){
    //             vanToast.style.display = 'none';
    //             vanToast.children[0].innerHTML = '';
    //         },1500)
    //     }
    // }
        
    // 判断有无手机号
    $('.sure-btn')[0].onclick = function(){
        $.ajax({
            url: "http://vueshop.glbuys.com/api/home/user/isreg?token=1ec949a15fb709370f",
            data: {username: $('.cellphone input')[0].value},
            type: "POST",
            dataType: "json",
            success: function(data) {
                // 已经存在
                if(data.data.isreg ==1){
                    vanToast.style.display = 'block';
                    vanToast.children[0].innerHTML = '此手机号已注册过，请更换手机号';
                    setTimeout(function(){
                        vanToast.style.display = 'none';
                        vanToast.children[0].innerHTML = '';
                    },1500)
                }else{
                    // 会员注册
                    axios({
                        method: 'post',
                        url: 'http://vueshop.glbuys.com/api/home/user/reg?token=1ec949a15fb709370f',
                        data: "cellphone="+$('.cellphone input')[0].value+"&"+"password="+$('.password input')[0].value
                    }).then(res => {
                        // console.log(res.data.code)
                        if(res.data.code ==302){
                            vanToast.style.display = 'block';
                            vanToast.children[0].innerHTML = '请输入密码';
                            setTimeout(function(){
                                vanToast.style.display = 'none';
                                vanToast.children[0].innerHTML = '';
                            },1500)
                        }else{
                            location.href = 'login.html';
                        }
                    })
                }
            }
        })
    }

    // 判断验证码是否正确
    // $('.sure-btn')[0].onclick = function(){
    //     $.ajax({
    //         url: "http://vueshop.glbuys.com/api/home/user/checkvcode?token=1ec949a15fb709370f",
    //         data: {vcode: $('.inputs input')[0].value},
    //         type: "POST",
    //         dataType: "json",
    //         success: function(data){
    //             console.log(data);
    //             console.log($('.inputs input')[0].value);
    //         }

    //     })
    // }

    
    

    // 点击注册 结束

    // 返回上一个页面
    let back = document.querySelector('.back');
    back.addEventListener('click',()=>{
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
         password.children[0].type = 'text';
         }else{
         vanSwitch.style.backgroundColor = '';
         vanSwitch.children[0].style.transform = '';
         password.children[0].type = 'password';
         }
        off =!off;
     })
   
}

