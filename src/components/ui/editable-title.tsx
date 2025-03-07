
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
          className="min-w-0"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <span className={titleClassName}>{title}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
    </div>
  );
};

export { EditableTitle };
