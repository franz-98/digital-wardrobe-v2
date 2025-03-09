
import React from "react";

export function ImageCropControls() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="text-sm text-muted-foreground">
        Tocca e trascina l'immagine per posizionarla.
      </div>
      <div className="text-sm text-muted-foreground">
        Usa due dita per ingrandire o ridurre. Puoi zoomare da 0.1x a 10x.
      </div>
      <div className="text-sm text-muted-foreground">
        Usa la rotellina del mouse per lo zoom.
      </div>
    </div>
  );
}
