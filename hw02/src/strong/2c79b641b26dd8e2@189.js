function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _constellation_list(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座 "]
)}

function _total_list(){return(
[]
)}

function _5(total_list,constellation_list,data)
{
  total_list .length = 0;
  for (var s=0; s<=11; s++) {
    total_list .push({constellation:constellation_list[s], gender:"Male", count:0});
    total_list .push({constellation:constellation_list[s], gender:"Female", count:0});   
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender=="男" ? 0 : 1); 
    total_list [i].count++;
  })
  return total_list 
}


function _6(md){return(
md`## 以 bar chart 呈現每個星座的人數 (1pt)`
)}

function _7(Plot,constellation_list,total_list){return(
Plot.plot({
  grid: true,
  x: {label: "constellation", domain : constellation_list},
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(total_list , {
        x: "constellation",
        y: "count",
        fill: "gender",
        tip: true,
        title: (d) =>`count: ${d.count}\nConstellation: ${d.constellation}\ngender: ${d.gender}`
    }),
    ]
})
)}

function _8(md){return(
md`## 以 histogram 呈現每個星座的人數 (1pt)`
)}

function _9(Plot,data,constellation_list){return(
Plot.plot({
  width:800,
  grid: true,
  x: {label: "constellation"},
  y: { label: "count"},
  marks: [
    Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),
    Plot.axisX({tickFormat: i => {return constellation_list[i]}}),
    Plot.ruleY([0])
  ] 
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("constellation_list")).define("constellation_list", _constellation_list);
  main.variable(observer("total_list")).define("total_list", _total_list);
  main.variable(observer()).define(["total_list","constellation_list","data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Plot","constellation_list","total_list"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Plot","data","constellation_list"], _9);
  return main;
}
