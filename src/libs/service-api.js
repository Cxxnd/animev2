export const getAnime = async ({ resource, query }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`, {
        next: { revalidate: 60 }
    })
    const data = await response.json()
    return data
}
