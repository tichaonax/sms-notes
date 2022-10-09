import React, { useEffect } from "react";
import mermaid from "mermaid";

export interface MermaidProps {
    chart: string,
}

export const Mermaid: React.FC<MermaidProps> = (props) =>{
  const {chart} = props;

  useEffect(() => {
    const doc = document.getElementById("mermaid")  as HTMLDivElement | null;
    if (doc) {
        doc.removeAttribute("data-processed");
    }
   
    mermaid.initialize({
      startOnLoad: true
    });
    mermaid.contentLoaded();
  },[chart]);

  return chart ? <div id="mermaid" className="mermaid">{chart}</div> : <div/>;
};