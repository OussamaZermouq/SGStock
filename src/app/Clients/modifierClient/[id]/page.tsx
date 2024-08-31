import * as React from "react";
import ModifierClientForm from "@/components/custom/contents/Clients/modifierClientForm";

export default function Page() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Modifier un client
        </h3>
        <ModifierClientForm />
      </div>
    </section>
  );
}
