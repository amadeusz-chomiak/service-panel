let index = 0
export const useId = () => {
  const id = `unique-id-${index++}`
  return {
    id
  }
}
