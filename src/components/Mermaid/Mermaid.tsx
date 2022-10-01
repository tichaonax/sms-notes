import React, { useEffect } from "react";
import mermaid from "mermaid";
import { matchMermaidGraph } from "../../utils/matchMermaidGraph";

export interface MermaidProps {
    chart: string,
}

export const Mermaid: React.FC<MermaidProps> = (props) =>{
  const {chart} = props;

  const graphMatch = matchMermaidGraph(chart);
  const loadGraph = (note:string) => note ? ((graphMatch >-1 )? note.substring(graphMatch) : null)  : null;
  const graph = loadGraph(chart);

  useEffect(() => {
    const doc = document.getElementById("mermaid")  as HTMLDivElement | null;
    if (doc) {
        doc.removeAttribute("data-processed");
    }
   
    mermaid.initialize({
      startOnLoad: true
    });
    mermaid.contentLoaded();
  },[graph]);

  return graph ? <div id="mermaid" className="mermaid">{graph}</div> : <div/>;
};