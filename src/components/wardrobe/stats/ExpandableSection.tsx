
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ 
  title, 
  children, 
  initialExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
  return (
    <div className="mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-base font-medium">{title}</h3>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      {isExpanded && children}
    </div>
  );
};

export default ExpandableSection;
