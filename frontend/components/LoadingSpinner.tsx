export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">Loading...</p>
    </div>
  );
}