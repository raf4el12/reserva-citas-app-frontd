export const useGetUserIdContext = () => {
  return parseInt(localStorage.getItem('userId') ?? '0')
}
