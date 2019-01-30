import Koa from 'koa';
import Router from 'koa-router';
import ReposApi from './api/repos'
import Portrait from './assets/portrait'

const app = new Koa();
const router = new Router();

router.get('/contributors/:owner/:repo.svg', async (ctx) => {
    const contributors = await ReposApi.listContributors(ctx.params.owner, ctx.params.repo);
    const portraitArr = contributors.map(c => {
        return {
            avatarUrl: c.avatar_url ? c.avatar_url : '',
            htmlUrl: c.html_url ? c.html_url : '',
        }
    });
    ctx.body = Portrait.build(portraitArr, ctx.query.number);
    ctx.set('content-type', 'image/svg+xml; charset=utf-8');
});

app.use(router.routes());
const port = 3000;
app.listen(port);
console.log(`Server running on port ${port}`);
