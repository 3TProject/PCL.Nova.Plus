import USER_AGENT from "./userAgent"
// const USER_AGENT = "PCL-Community/PCL.Proto/0.0.1"

const MODRINTH_BASE_URL = "https://api.modrinth.com/v2/"

/**
 * 通用 Modrinth API 请求
 */
async function modrinthFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = MODRINTH_BASE_URL + endpoint;
    const headers = {
        "User-Agent": USER_AGENT,
        ...(options.headers || {}),
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        throw new Error(`Modrinth API 请求失败: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

export type ProjectType = 'mod' | 'modpack' | 'resourcepack' | 'shader'
interface SearchOptions {
    query?: string;
    facets?: string[][]; // 二维数组，支持 AND/OR 逻辑
    index?: 'relevance' | 'downloads' | 'follows' | 'newest' | 'updated';
    offset?: number;
    limit?: number;
}

export interface ISearchHit {
    title: string
    description: string
    icon_url: string
    categories: string[]
    downloads: number
    date_modified: string
}
// 搜索项目
async function searchProjects(options?: SearchOptions) {
    if (!options) return modrinthFetch<{ hits: ISearchHit[], offset: number, limit: number, total_hits: number }>(`search`);
    const params = new URLSearchParams()
    if (options.query) params.append('query', options.query)
    if (options.facets) params.append('facets', JSON.stringify(options.facets))
    if (options.index) params.append('index', options.index)
    if (options.offset) params.append('offset', options.offset.toString())
    if (options.limit) params.append('limit', options.limit.toString())
    return modrinthFetch<{ hits: ISearchHit[], offset: number, limit: number, total_hits: number }>(`search?${params.toString()}`);
}

// 获取项目详情
async function getProject(id: string) {
    return modrinthFetch(`project/${id}`);
}

// 获取项目版本
async function getProjectVersions(id: string) {
    return modrinthFetch(`project/${id}/version`);
}

export default {
    searchProjects,
    getProject,
    getProjectVersions,
}