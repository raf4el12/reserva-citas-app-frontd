export const useGetUserIdContext = () => {
  return Number.parseInt(localStorage.getItem('userId') ?? '0')
}
