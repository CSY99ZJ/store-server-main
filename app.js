const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');
const Session = require('koa-session');
const cors = require('@koa/cors'); // 引入 CORS 中间件


let app = new Koa();

// 启用跨域
app.use(cors());

// 处理异常
const error = require('./app/middleware/error');
app.use(error);

// 为静态资源请求重写url
const rewriteUrl = require('./app/middleware/RewriteUrl');
app.use(rewriteUrl);

// 使用 koa-static 处理静态资源
app.use(KoaStatic(staticDir));

// session
const CONFIG = require('./app/middleware/session');
app.keys = ['session app keys'];
app.use(Session(CONFIG, app));

// 判断是否登录
const isLogin = require('./app/middleware/isLogin');
app.use(isLogin);

app.use(async (ctx, next) => {
  ctx.state.user = ctx.session.user;
  await next();
});

// 处理请求体数据
const koaBodyConfig = require('./app/middleware/koaBodyConfig');
app.use(KoaBody(koaBodyConfig));

// 使用路由中间件
const Routers = require('./app/routers');
app.use(Routers.routes()).use(Routers.allowedMethods());

// 导出 Koa 的回调函数
module.exports = app.callback();
