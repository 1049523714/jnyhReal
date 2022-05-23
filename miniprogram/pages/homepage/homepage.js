// miniprogram/pages/homepage/homepage.js


const app = getApp()

Page({
  data: {
    swiperImgNo: 1,
    imgSwiperUrl: '',
    fruitInfo: [],
    typeCat: [
      { id: 0, name: "热菜" },
      { id: 1, name: "凉菜" },
      { id: 2, name: "主食" },
      { id: 3, name: "店主推荐" },
    ],
    activeTypeId: 0,
    isShow:true, 
    openid: '',   
    offLine:null  //是否维护
  },

  // 获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'add',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  },

  // ------------加入购物车------------
  addCartByHome: function(e) {
    // console.log(e.currentTarget.dataset._id)
    var self = this
    let newItem = {}
    app.getInfoWhere('jnyhFood', { _id: e.currentTarget.dataset._id },
      e => {
        // console.log(e.data["0"])
        var newCartItem = e.data["0"]
        newCartItem.num = 1
        app.isNotRepeteToCart(newCartItem)
        wx.showToast({
          title: '已添加至购物车',
        })
      }
    )
  },


  // ------------分类展示切换---------
  typeSwitch: function(e) {
     console.log(e.currentTarget.id)
    getCurrentPages()["0"].setData({
      activeTypeId: parseInt(e.currentTarget.id)
    })
    switch (e.currentTarget.id) {
      // 全部展示
      case '0':
        wx.cloud.callFunction({
          // 云函数名称
          name: 'getAllFood',
          // 传给云函数的参数
          data: {
            a:"1",
            b:2
          },
          success: function(res) {
            console.log(res.result)
            getCurrentPages()[0].setData({
              fruitInfo:res.result
            })
          },
          fail: console.error
        })
        break;
      // 今日特惠
      case '1':
        wx.cloud.callFunction({
          // 云函数名称
          name: 'getAllFood',
          // 传给云函数的参数
          data: {
            a:"2",
            b:2
          },
          success: function(res) {
            console.log(res.result)
            getCurrentPages()[0].setData({
              fruitInfo:res.result
            })
          },
          fail: console.error
        })
        break;
      // 销量排行
      case '2':
        wx.cloud.callFunction({
          // 云函数名称
          name: 'getAllFood',
          // 传给云函数的参数
          data: {
            a:"3",
            b:2
          },
          success: function(res) {
            console.log(res.result)
            getCurrentPages()[0].setData({
              fruitInfo:res.result
            })
          },
          fail: console.error
        })
        break;
      // 店主推荐
      case '3':
        console.log("酒水")
        break;
    }
  },


  // ---------点击跳转至详情页面-------------
  tapToDetail: function(e) {
    wx.navigateTo({
      url: '../detail/detail?_id=' + e.currentTarget.dataset.fid,
    })
  },
  add: function(e) {
    const db = wx.cloud.database()
    
  },


  // ------------生命周期函数------------
  onLoad: function (options) {
    
   
    /*const db = wx.cloud.database()
    db.collection('jnyhFood').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name:"黄金饼",
        zhonglei:"3",
        price:"38",
        unit:"例",
        imgUrl:"cloud://alang1-b5455b.616c-alang1-b5455b-1300246101/jnyhphoto/mainfood/黄金饼38.png"
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })*/
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getAllFood',
      // 传给云函数的参数
      data: {
        a:"1",
        b:2
      },
      success: function(res) {
        console.log(res.result)
        getCurrentPages()[0].setData({
          fruitInfo:res.result
        })
      },
      fail: console.error
    })
  },

  onReady: function () {
    // console.log(getCurrentPages()["0"].data)
  },

  onShow: function () {
    
    
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {
    return {
      title: '水果园byVoyz',
      imageUrl: '../../images/icon/fruit.jpg',
      path: '/pages/homepage/homepage'
    }
  }

})