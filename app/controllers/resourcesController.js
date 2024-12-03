/*
 * @Description: 资源模块控制器
 */
const resourcesDao = require('../models/dao/resourcesDao');
module.exports = {
  /**
   * 获取轮播图数据
   * @param {Object} ctx
   */
  Carousel: async ctx => {
    let carousel = await resourcesDao.Carousel();
    ctx.body = {
      code: '001',
      carousel
    }
  }
}