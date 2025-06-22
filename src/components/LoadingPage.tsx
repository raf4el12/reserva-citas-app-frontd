const LoadingPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-transparent p-4">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LoadingPage
