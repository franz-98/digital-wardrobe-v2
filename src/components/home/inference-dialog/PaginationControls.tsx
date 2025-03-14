
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
    
    const maxVisible = window.innerWidth < 640 ? 5 : 7; // Show fewer on mobile
    const halfMaxVisible = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(0, currentIndex - halfMaxVisible);
    let endPage = Math.min(totalItems - 1, startPage + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const handlePageClick = (pageIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    if (pageIndex !== currentIndex) {
      onPageChange(pageIndex);
    }
  };
  
  return (
    <div className="mt-3 mb-3 border-t border-b py-3">
      <Pagination className="select-none">
        <PaginationContent className="flex flex-wrap justify-center gap-1">
          {showPageNumbers().map((pageIndex) => (
            <PaginationItem key={pageIndex}>
              <PaginationLink 
                onClick={(e) => handlePageClick(pageIndex, e)} 
                isActive={currentIndex === pageIndex}
                className={cn(
                  "h-9 w-9 p-0 flex items-center justify-center relative",
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
