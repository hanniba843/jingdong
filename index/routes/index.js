const router = require('koa-router')()
const fs=require('fs')
const axios=require('axios')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/quick-nav', async (ctx, next) => {
  var response=await axios.get('http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f');
  var ids=response.data.data.map((v,i)=>{
    return v
  })
  ctx.body={
    errcode:0,
    errmsg:'ok',
    ids
  }
})

router.get('/goods-main',async(ctx,next)=>{
  var goodsMain = await axios.get('http://vueshop.glbuys.com/api/home/index/goodsLevel?token=1ec949a15fb709370f');
  var ids = goodsMain.data.data.map((v,i)=>{
    return v;
  })
  ctx.body = {
    ids
  }
})

router.get('/Home-page-recommendation',async(ctx,next)=>{
  var HomePageRecommendation = await axios.get('http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f');
  var ids = HomePageRecommendation.data.data.map((v,i)=>{
    return v;
  })
  ctx.body={
    ids
  }
})

router.get('/Left-menu',async(ctx,next)=>{
  var LeftMenu = await axios.get('http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f');
  var ids = LeftMenu.data.data.map((v,i)=>{
    return v;
  })
  ctx.body = {
    ids
  }
})




module.exports = router
