export const joinCssClasses = (...cssClasses: string[]): string => {
  return cssClasses.filter(Boolean).join(' ').trim()
}
