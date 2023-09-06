"use client";
import React, { useContext } from "react";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import Link from "next/link";

const Lab = () => {
  const { labs } = useContext(LabContext) as LabContextType;

  return (
    <div>
      Lab
      {labs.map((lab) => (
        <Link href={`/instructor/labs/${lab._id}`} key={lab._id}>
          <div>{lab.labSessionName}</div>
        </Link>
      ))}
    </div>
  );
};

export default Lab;