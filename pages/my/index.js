var util = require('../../utils/util.js');
const app = getApp()
import oneBusinessTemp from '../common/oneBusinessTemp';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneBusiness: {},
    isMyPage: true,
    imageIndex: 1,
  },

  getFollowerById: oneBusinessTemp.getFollowerById,
  getFansById: oneBusinessTemp.getFansById,

  modifyCard: function (event) {
    wx.navigateTo({
      url: './type'
    });
  },

  loadOneBusiness: function (id) {
    var op = this;
    // 加载一个商户
    app.getUrl('/business/info/' + id, function (data) {
      if (app.hasData(data)) {
        if(data == null || data.length == 0) return;
        op.setData({ oneBusiness: data[0] });
      }
    });
  },

  refresh:function(){
    var op = this;
    var id = app.getUserId();
    this.loadOneBusiness(id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.refresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var op = this;
    var allUrl = util.fillUrlParams('/pages/business/oneBusiness', {
      id: app.getUserId(),
      follow:0
    });

    return {
      title: '请关注我',
      path: allUrl,
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})