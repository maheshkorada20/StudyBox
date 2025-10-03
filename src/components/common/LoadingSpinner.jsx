const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}></div>
      {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
