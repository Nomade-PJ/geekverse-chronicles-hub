
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDelay: '0.15s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
