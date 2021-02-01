import { createApiRequest } from '../fetchData'
import Id from '../randomUID'

type fetchOptions = {
  method: string
  params?: [{ id?: string; theme_id?: string; template?: string[]; answer?: string[]; position?: number; image?: string }]
  id: string
}

export function requestOptions(method: string, params?): fetchOptions {
  return {
    method: method,
    params: params ? [params] : [{}],
    id: `${Id()}`
  }
}

export const createTheme = async (name: string) => {
  const res = await createApiRequest(requestOptions('MathAdminAPI.ModifyTheme', { name: name }))
  return res.result
}

export const getThemeList = async () => {
  const res = await createApiRequest(requestOptions('MathAdminAPI.GetThemeList'))
  return res.result
}

export const createTemplate = async (theme_id: string, template: string[], answer: string[], image?: string) => {
  const res = await createApiRequest(
    requestOptions(
      'MathAdminAPI.ModifyTemplate',
      image
        ? {
            theme_id: theme_id,
            template: template,
            answer: answer,
            image: image
          }
        : {
            theme_id: theme_id,
            template: template,
            answer: answer
          }
    )
  )
  return res.result
}
