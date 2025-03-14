
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PaginationControlsProps {
  currentIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  confirmedItems: Set<number>;
}

const PaginationControls = ({ 
  currentIndex, 
  totalItems, 
  onPageChange, 
  confirmedItems 
}: PaginationControlsProps) => {
  if (totalItems <= 1) return null;

  // For mobile view, show max 5 pages (current + 2 before + 2 after)
  const showPageNumbers = () => {
    const pages = [];
    
    const maxPages = totalItems > 7 ? 7 : totalItems;
    const halfMaxVisible = Math.floor(maxPages / 2);
    
    let startPage = Math.max(0, currentIndex - halfMaxVisible);
    let endPage = Math.min(totalItems - 1, startPage + maxPages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(0, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  return (
    <div className="mt-2 mb-2 border-t border-b py-2">
      <Pagination className="select-none">
        <PaginationContent className="flex flex-wrap justify-center gap-1">
          {showPageNumbers().map((pageIndex) => (
            <PaginationItem key={pageIndex}>
              <PaginationLink 
                onClick={() => onPageChange(pageIndex)} 
                isActive={currentIndex === pageIndex}
                className={cn(
                  "h-8 w-8 p-0 flex items-center justify-center relative",
                  confirmedItems.has(pageIndex) ? "text-green-600 font-medium" : ""
                )}
              >
                {pageIndex + 1}
                {confirmedItems.has(pageIndex) && (
                  <Check className="absolute -top-1 -right-1 h-3 w-3" />
                )}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
