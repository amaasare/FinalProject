// All fetch requests should go through this function
// This function adds the base URL to the fetch request
// So you don't have to add the base URL to every fetch request
export async function fetchWithBaseUrl(url, options) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
}
