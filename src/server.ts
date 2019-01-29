import Koa from 'koa';
import Router from 'koa-router';
import ReposApi from './api/repos'
import Portrait from './assets/portrait'

const app = new Koa();
const router = new Router();

router.get('/contributors/:owner/:repo', async (ctx) => {
    ctx.body = await ReposApi.listContributors(ctx.params.owner, ctx.params.repo);
});

router.get('/test.svg', async (ctx) => {
    const arr = [{
        avatarUrl: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
        href: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
    }, {
        avatarUrl: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
        href: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
    }, {
        avatarUrl: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
        href: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
    }, {
        avatarUrl: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
        href: 'https://avatars3.githubusercontent.com/u/9838749?v=4',
    },];
    ctx.body = Portrait.build(arr);
    ctx.remove('Content-Type');

});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
