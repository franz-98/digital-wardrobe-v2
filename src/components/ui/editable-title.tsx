
import React, { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditableTitleProps {
  title: string;
  className?: string;
  titleClassName?: string;
  onSave: (newTitle: string) => boolean;
}

const EditableTitle = ({ title, className, titleClassName, onSave }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleSave = () => {
    console.log("Saving edited title:", editedTitle);
    if (editedTitle !== title) {
      const success = onSave(editedTitle);
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Input
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="min-w-0 h-8 py-1 px-2 text-sm"
          size={10}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 group ${className || ""}`}>
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity mr-1"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="h-3 w-3" />
        <span className="sr-only">Edit</span>
      </Button>
      <span className={titleClassName}>{title}</span>
    </div>
  );
};

export { EditableTitle };
