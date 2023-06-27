import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const meilisearchHost = process.env.MEILISEARCH_HOST || "http://localhost:7700"
const searchClient = instantMeiliSearch(meilisearchHost, '')

export default searchClient
