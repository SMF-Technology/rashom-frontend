"use client"

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function DefaultAccordion() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1} >
        <AccordionHeader onClick={() => handleOpen(1)} className="text-black text-base">What is Urban Sailor, and what do you offer?</AccordionHeader>
        <AccordionBody>
        Urban Sailor is a modern lifestyle brand offering high-quality apparel, accessories, and footwear for men, women, and kids. We focus on timeless designs, premium fabrics, and sustainable practices to keep you looking stylish and feeling comfortable. Let us know how we can help.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} >
        <AccordionHeader onClick={() => handleOpen(2)} className="text-black text-base">
        Where are you located?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)} className="text-black text-base">
        What are your business hours?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} >
        <AccordionHeader onClick={() => handleOpen(4)} className="text-black text-base">
        Do you have a physical Store?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at. We&apos;re constantly
          growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
          ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
    </>
  );
}