export const matchMermaidGraph=(s:string)=>{

    const glr = /graph LR/;
    const grl = /graph RL/;
    const gtb = /graph TB/;
    const gbt = /graph BT/;
    const gtd = /graph TD/;
    const sequence = /sequenceDiagram/;
    const classDiagram = /classDiagram/;
    const stateDiagramV2 = /stateDiagram-v2/;
    const gantt = /gantt/;
    const pie = /pie/;
    const erDiagram = /erDiagram/;
    const journey = /journey/;
    const gitGraph = /gitGraph/;
    const flowchart = /flowchart/;


   return Math.max(...[
        s.search(glr),
        s.search(grl),
        s.search(gtb),
        s.search(gbt),
        s.search(gtb),
        s.search(sequence),
        s.search(classDiagram),
        s.search(stateDiagramV2),
        s.search(gantt),
        s.search(pie),
        s.search(erDiagram),
        s.search(journey),
        s.search(gitGraph),
        s.search(gtd),
        s.search(flowchart)
    ]);
}