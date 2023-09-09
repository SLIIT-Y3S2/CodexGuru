"use client";
import AiChatBot from "@/components/AiChat";
import CodeEditor from "@/components/CodeEditor";
import Forum from "@/components/Forum";
import ForumDrawer from "@/components/Forum/ForumDrawer";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import React, { useContext } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  return (
    <div className="relative h-[93.5vh] overflow-auto">
      <h1>Lab Session</h1>
      <CodeEditor />
      <AiChatBot />
      <Forum labId={params.session} />
    </div>
  );
};

export default Session;