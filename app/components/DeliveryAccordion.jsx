"use client";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function DeliveryAccordion() {
  const [open, setOpen] = React.useState(false);
  const [cep, setCep] = React.useState("");

  const handleOpen = () => setOpen(!open);

  const handleCalculate = () => {
    // Add your logic here for shipping calculation
    alert(`Calculating shipping for CEP: ${cep}`);
  };

  return (
    <Accordion open={open}>
      <AccordionHeader
        onClick={handleOpen}
        className="text-black text-base font-semibold"
      >
       Shipping Charge
      </AccordionHeader>
      <AccordionBody>
        <p className="text-sm text-black mb-2">
          Calculate the shipping charge:
        </p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Enter your CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="border border-gray-300 px-2 outline-none py-2 rounded w-full"
          />
          <button
            onClick={handleCalculate}
            className="px-4 py-1 bg-black text-white font-semibold rounded"
          >
            Calculate
          </button>
        </div>
        <a href="#" className="text-black font-semibold text-sm underline">
          I don’t know my CEP
        </a>
      </AccordionBody>
    </Accordion>
  );
}
