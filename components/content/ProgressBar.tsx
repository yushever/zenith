type ProgressBarProps = {
  value: number;
};

export const ProgressBar = ({ value }: ProgressBarProps) => {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
      aria-label={`Watch progress: ${value}%`}
    >
      <div
        className="h-full rounded-full bg-red-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
