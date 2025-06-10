export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-400 text-sm">Loading 3D Model...</p>
      </div>
    </div>
  );
}