import Koa from 'koa';
import Router from 'koa-router';
import ReposApi from './api/repos'
import Portrait, {Portrait as P} from './assets/portrait'
import Commander from 'commander'
import Image from './util/image'

Commander
    .option('-p, --port <port>', 'server port', 3000)
    .parse(process.argv);

const router = new Router();

router.get('/contributors/:owner/:repo.svg', async (ctx) => {
    let contributors = [];
    try {
        contributors = await ReposApi.listContributors(ctx.params.owner, ctx.params.repo);
    } catch (e) {
        ctx.body = `repository not exists`;
        return;
    }

    const avatarNotExistContributors = contributors.filter(c => c.avatar_url == undefined);
    if (avatarNotExistContributors.length) {
        const names = avatarNotExistContributors.map(c => c.id).join(',');
        ctx.body = `[${names}] not have avatar_url`;
        return;
    }
    const promiseArr = contributors.map(c => Image.downloadImgToBase64(c.avatar_url as string));
    const avatarHrefArr = await Promise.all(promiseArr);

    const portraitArr: P[] = [];
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

const app = new Koa();
app.use(router.routes());
app.listen(Commander.port);

console.log(`Server running on port ${Commander.port}`);
