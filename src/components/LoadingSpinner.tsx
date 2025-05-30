interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const spinnerSize = sizeClasses[size];

  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        <div className={`${spinnerSize} border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}></div>
        <div className={`absolute inset-0 ${spinnerSize} border-4 border-transparent border-t-pink-500 rounded-full animate-spin`} style={{ animationDelay: '0.15s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
