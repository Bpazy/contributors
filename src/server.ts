import Koa from 'koa';
import Router from 'koa-router';
import ReposApi from './api/repos'
import Portrait, {Portrait as P} from './assets/portrait'
import axios from 'axios'

const app = new Koa();
const router = new Router();

router.get('/contributors/:owner/:repo.svg', async (ctx) => {
    const contributors = await ReposApi.listContributors(ctx.params.owner, ctx.params.repo);
    const portraitArr: P[] = [];

    const promiseArr = contributors.map(c => downloadImg(c.avatar_url ? c.avatar_url : ''));
    const avatarHrefArr = await Promise.all(promiseArr);

    for (const index in contributors) {
        const contributor = contributors[index];
        const avatarHref = avatarHrefArr[index];
        if (!contributor || !avatarHref) continue;

        portraitArr.push({
            avatarHref,
            htmlUrl: contributor.html_url ? contributor.html_url : '',
        })
    }

    ctx.body = Portrait.build(portraitArr, ctx.query.number);
    ctx.set('content-type', 'image/svg+xml; charset=utf-8');
});

async function downloadImg(url: string): Promise<string> {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    });

    return "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data, 'binary').toString('base64');
}

app.use(router.routes());
const port = 3000;
app.listen(port);
console.log(`Server running on port ${port}`);
