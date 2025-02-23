"use client"

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function DescriptionAccordion({title,description}) {
  const [open, setOpen] = React.useState(false);

 
  const handleOpen = () => setOpen(!open)
  
  return (
    <>
      <Accordion open={open} >
        <AccordionHeader onClick={() => handleOpen(1)} className="text-black text-base"> {title} </AccordionHeader>
        <AccordionBody>
       {description}
        </AccordionBody>
      </Accordion>

    </>
  );
}