/*
 * @Description: 资源模块数据持久层
 */
const db = require('./db.js');

module.exports = {
  // 连接数据库获取轮播图数据
  Carousel: async () => {
    const sql = 'select * from carousel';
    return await db.query(sql, []);
  }
}