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

export const createListsForAll = async (themeId: string, listName: string) => {
  return await createApiRequest(
    requestOptions('MathAdminAPI.CreateListsForAll', {
      theme_id: themeId,
      list_name: listName
    })
  )
}

export const generateTasksForTheme = async (themeId: string) => {
  return await createApiRequest(
    requestOptions('MathAdminAPI.GenerateTasksForTheme', {
      theme_id: themeId
    })
  )
}

export const createTheme = async (name: string, description?: string) => {
  const res = await createApiRequest(
    requestOptions('MathAdminAPI.ModifyTheme', {
      name: name,
      description: description
    })
  )
  return res.result
}

export const modifyTheme = async (id: string, name: string, description: string, level?: number) => {
  const res = await createApiRequest(
    requestOptions('MathAdminAPI.ModifyTheme', {
      id: id,
      name: name,
      description: description,
      level: level
    })
  )
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

export const modifyTemplate = async (id: string, themeId: string, template: string[], answer: string[], position?: number, image?: string) => {
  const res = await createApiRequest(
    requestOptions('MathAdminAPI.ModifyTemplate', {
      id: id,
      theme_id: themeId,
      template: template,
      answer: answer,
      position: position,
      image: image
    })
  )
  return res.result
}

export const getTemplate = async (taskId) => {
  const res = await createApiRequest(requestOptions('MathAdminAPI.GetTemplate', { id: taskId }))
  return res.result
}

export const getTemplateList = async (themeId) => {
  const res = await createApiRequest(requestOptions('MathAdminAPI.GetTemplateList', { theme_id: themeId }))
  return res.result
}
