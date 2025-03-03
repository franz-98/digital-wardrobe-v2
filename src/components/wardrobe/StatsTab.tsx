
import React from 'react';
import { Card } from "@/components/ui/card";
import TimeRangeSelector from './TimeRangeSelector';

interface StatsTabProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  updateStatsForTimeRange: (range: string) => void;
  updateStatsForCustomRange: (start: Date, end: Date) => void;
}

const StatsTab = ({
  timeRange,
  setTimeRange,
  updateStatsForTimeRange,
  updateStatsForCustomRange
}: StatsTabProps) => {
  return (
    <>
      <div className="flex justify-end mb-4">
        <TimeRangeSelector 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          updateStatsForTimeRange={updateStatsForTimeRange}
          updateStatsForCustomRange={updateStatsForCustomRange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-base font-medium mb-4">Wardrobe Composition</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tops</span>
              <span className="font-medium text-sm">40%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '40%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Bottoms</span>
              <span className="font-medium text-sm">20%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Dresses</span>
              <span className="font-medium text-sm">15%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Outerwear</span>
              <span className="font-medium text-sm">10%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '10%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Accessories</span>
              <span className="font-medium text-sm">15%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-base font-medium mb-4">Color Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Blue</span>
              </div>
              <span className="font-medium text-sm">25%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
                <span className="text-sm">Black</span>
              </div>
              <span className="font-medium text-sm">20%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-black h-full rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Red</span>
              </div>
              <span className="font-medium text-sm">15%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Green</span>
              </div>
              <span className="font-medium text-sm">15%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Other</span>
              </div>
              <span className="font-medium text-sm">25%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StatsTab;
