
import React from "react";
import { Card } from "@/components/ui/card";

const HowItWorksGuide = () => {
  return (
    <Card className="p-4 mt-4 border bg-secondary/10">
      <h3 className="font-medium text-sm mb-2">Come funziona il riconoscimento vestiti</h3>
      <p className="text-sm text-muted-foreground mb-2">
        La nostra app è in grado di riconoscere automaticamente i singoli indumenti presenti in un'immagine.
      </p>
      <div className="text-sm space-y-2">
        <div className="flex items-start">
          <div className="min-w-[24px] h-6 flex justify-center">
            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">1</div>
          </div>
          <p className="ml-2">Puoi caricare un singolo indumento per aggiungerlo al tuo guardaroba</p>
        </div>
        <div className="flex items-start">
          <div className="min-w-[24px] h-6 flex justify-center">
            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">2</div>
          </div>
          <p className="ml-2"><strong>Consigliato:</strong> Carica un outfit completo e l'app riconoscerà automaticamente ogni pezzo</p>
        </div>
        <div className="flex items-start">
          <div className="min-w-[24px] h-6 flex justify-center">
            <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">3</div>
          </div>
          <p className="ml-2">Accetta o modifica i risultati del riconoscimento prima di salvarli</p>
        </div>
      </div>
    </Card>
  );
};

export default HowItWorksGuide;
