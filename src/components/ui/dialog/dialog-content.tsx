
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"
import { DialogPortal } from "./dialog-primitive"
import { DialogOverlay } from "./dialog-overlay"
import { useDismissOnScroll } from "./use-dismiss-on-scroll"

export interface DialogContentProps extends 
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  enableDismissOnScroll?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, enableDismissOnScroll = false, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  // Use our custom hook for dismiss-on-scroll behavior
  useDismissOnScroll(contentRef, {
    enableDismissOnScroll,
    onDismiss: (e) => props.onPointerDownOutside?.(e as any)
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
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
})
DialogContent.displayName = DialogPrimitive.Content.displayName

export { DialogContent }
