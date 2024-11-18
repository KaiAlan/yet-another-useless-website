import { WavyParagraph, WavyWord } from "@/components/menu-01";
import React from "react";

const WavyPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-black">
      <WavyWord value="Overlay" className="text-lg h-10" />
      <WavyParagraph
        value="The Overlay works with most liners and is compatible with distal fixation"
      />
    </div>
  );
};

export default WavyPage;
