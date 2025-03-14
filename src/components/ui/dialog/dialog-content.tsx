
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { DialogPortal } from "./dialog-primitive"
import { DialogOverlay } from "./dialog-overlay"
import { useDismissOnScroll } from "./use-dismiss-on-scroll"

export interface DialogContentProps extends 
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  enableDismissOnScroll?: boolean;
  dismissThreshold?: number;
  showDismissIndicator?: boolean;
  onProgressChange?: (progress: number) => void;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ 
  className, 
  children, 
  enableDismissOnScroll = false, 
  dismissThreshold = 50,
  showDismissIndicator = true,
  onProgressChange,
  ...props 
}, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [dismissProgress, setDismissProgress] = React.useState(0);
  
  // Use our custom hook for dismiss-on-scroll behavior
  useDismissOnScroll(contentRef, {
    enableDismissOnScroll,
    dismissThreshold,
    onDismiss: (e) => props.onPointerDownOutside?.(e as any),
    onProgressChange: (progress) => {
      setDismissProgress(progress);
      // Forward progress to parent component if callback is provided
      if (onProgressChange) {
        onProgressChange(progress);
      }
    }
  });

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={(node) => {
          // Handle both refs
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          if (node) {
            contentRef.current = node as HTMLDivElement;
          }
        }}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-[95vw] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-3 border bg-background p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        
        {/* Dismiss Indicator */}
        {enableDismissOnScroll && showDismissIndicator && dismissProgress > 0 && (
          <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
            <div className="relative h-1.5 w-16 bg-muted rounded-full mt-2 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-100 ease-out"
                style={{ width: `${dismissProgress}%` }}
              />
            </div>
            {dismissProgress > 60 && (
              <span className="absolute -bottom-6 text-xs font-medium text-muted-foreground animate-fade-in">
                Release to close
              </span>
            )}
          </div>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
})
DialogContent.displayName = DialogPrimitive.Content.displayName

export { DialogContent }
