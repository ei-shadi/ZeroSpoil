
const SkeletonCard = () => {
  return (
    <div className="flex flex-col bg-gray-200 rounded-xl shadow w-full max-w-xs overflow-hidden mx-auto animate-pulse">
      {/* Image placeholder */}
      <div className="h-56 bg-gray-300" />

      {/* Content placeholder */}
      <div className="flex flex-col flex-1 px-4 py-5">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-400 rounded mb-3 w-3/4 mx-auto" />

        {/* Details placeholder */}
        <div className="flex justify-between mb-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded w-20" />
            <div className="h-4 bg-gray-400 rounded w-20" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded w-16" />
            <div className="h-4 bg-gray-400 rounded w-16" />
          </div>
        </div>

        {/* Button placeholder */}
        <div className="h-8 bg-gray-400 rounded w-1/2 mx-auto mt-auto" />
      </div>
    </div>
  );
};

export default SkeletonCard;
