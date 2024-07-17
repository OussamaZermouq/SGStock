"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AjouterClientSocieteForm from "./ajouterClientSocieteForm";
import AjouterClientCommuneForm from "./ajouterClientCommuneForm";

export default function AjouterClientForm() {
  const [clientType, setClientType] = React.useState<String>("");

  function onChangeTypeValue(value: string) {
    setClientType(value);
  }
  return (
    <div className="flex flex-col">
      <h4>Type du Client</h4>
      <div className="flex justify-start mt-5 px-12">
        <Select onValueChange={onChangeTypeValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type du client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="commune">Commune</SelectItem>
            <SelectItem value="societe">Societe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
      {clientType == "societe" && (
          <AjouterClientSocieteForm />
        )} 
        {clientType == "commune" && (
          <AjouterClientCommuneForm />
        )}
        </div>
    </div>
  );
}
