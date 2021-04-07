let index = 0
export const idPrefix = 'unique-id-'
export const useId = () => {
  const id = `${idPrefix}${index++}`
  return {
    id
  }
}
