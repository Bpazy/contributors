import Koa from 'koa';
import Router from 'koa-router';
import reposApi from './api/repos'

const app = new Koa();
const router = new Router();

router.get('/contributors/:owner/:repo', async (ctx) => {
    ctx.body = await reposApi.listContributors(ctx.params.owner, ctx.params.repo);
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
