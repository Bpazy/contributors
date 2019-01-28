import http from '../util/http'

interface Contributor {
    login?: string;
    id?: number;
    nodeId?: string;
    avatarUrl?: string;
    gravatarId?: string;
    url?: string;
    htmlUrl?: string;
    followersUrl?: string;
    followingUrl?: string
    giftsUrl?: string;
    starredUrl?: string;
    subscriptionsUrl?: string;
    organizationsUrl?: string;
    reposUrl?: string;
    eventsUrl?: String;
    receivedEventsUrl?: string;
    type?: string;
    siteAdmin?: boolean;
    contributions?: number;
}

async function listContributors(owner: string, repo: string): Promise<Contributor[]> {
    const contributors = (await http.get<Contributor[]>(`/repos/${owner}/${repo}/contributors`)).data
    return Promise.resolve(contributors)
}

export default {listContributors}
