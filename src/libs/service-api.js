export const getAnime = async ({ resource, query }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`, {
        next: { revalidate: 100 },
        timeout: 5000,
    })
    const data = await response.json()
    return data
}
