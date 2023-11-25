const searchEndpoint = 'https://api.bing.microsoft.com/v7.0/images/search'
const searchKey = import.meta.env.VITE_BING_SEARCH_KEY

export interface ImageSearchResult {
  url: string
  thumbnailUrl: string
  width: number
  height: number
}

export async function search(query: string, count: number): Promise<ImageSearchResult[]> {
  try {
    const response = await fetch(
      `${searchEndpoint}?q=${encodeURIComponent(query)}&count=${count}`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': searchKey,
        },
      },
    )
    const data = await response.json()
    console.log(data)
    return data.value.map((result: any) => ({
      url: result.contentUrl,
      thumbnailUrl: result.thumbnailUrl,
      width: result.width,
      height: result.height,
    }))
  } catch (err) {
    console.error(err)
    return []
  }
}
