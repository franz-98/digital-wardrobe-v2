
interface TimeRangeMenuProps {
  timeRange: string;
  onSelectTimeRange: (range: string) => void;
}

const TimeRangeMenu = ({ timeRange, onSelectTimeRange }: TimeRangeMenuProps) => {
  return (
    <div className="absolute top-full right-0 mt-2 z-10 bg-background/90 backdrop-blur-lg rounded-xl shadow-lg border border-border/50 py-1 text-sm w-40 overflow-hidden animate-fade-in">
      <button 
        className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange === "week" ? "font-medium text-primary" : ""}`}
        onClick={() => onSelectTimeRange("week")}
      >
        Last week
      </button>
      <button 
        className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange === "month" ? "font-medium text-primary" : ""}`}
        onClick={() => onSelectTimeRange("month")}
      >
        Last month
      </button>
      <button 
        className={`w-full text-left px-4 py-2.5 hover:bg-primary/10 text-foreground transition-colors ${timeRange !== "week" && timeRange !== "month" ? "font-medium text-primary" : ""}`}
        onClick={() => onSelectTimeRange("custom")}
      >
        Custom range...
      </button>
    </div>
  );
};

export default TimeRangeMenu;
