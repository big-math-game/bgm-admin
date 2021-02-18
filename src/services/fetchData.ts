import { url } from '../requestsUrl'

export async function createApiRequest(body) {
  const request = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }).catch((error) => {
    throw console.log(error)
  })
  const response = await request.json()
  if (response.result !== null) {
    return response
  } else {
    console.log(response.error)
    return response
  }
}
