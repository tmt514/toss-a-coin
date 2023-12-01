import * as React from "react"
import {Component, useState, useEffect} from "react"
import { Link } from "gatsby"
import { useDrag } from '@use-gesture/react'

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../components/lis.css"
import { animated, SpringValue, useSprings } from '@react-spring/web'
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons"
import { elements } from "chart.js";


const matToString = (mat) => {
  var n = mat.length;
  var newMatVal = "[";
      for (var i = 0; i < n; i++) {
        var t = []
        for (var j = 0; j < n; j++) {
          t.push(mat[i][j].toFixed(1))
        }
        newMatVal += "[" + t.join(', ') + "],\n"
      }
      newMatVal += "]"
  return newMatVal;
}

const MarkovPage = () => {
  const [mat, setMat] = useState([
    [0.6, 0.4, 0, 0],
    [0, 0, 0.6, 0.4],
    [0.7, 0.3, 0, 0],
    [0, 0, 0.2, 0.8]]);
  const [childKey, setChildKey] = useState(0);
  const [matval, setMatVal] = useState(`[[0.6, 0.4, 0.0, 0.0],
[0.0, 0.0, 0.6, 0.4],
[0.7, 0.3, 0.0, 0.0],
[0.0, 0.0, 0.2, 0.8]]`);
  const [parseOk, setParseOk] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [stateLabels, setStateLabels] = useState(["0", "1", "2", "3"]);
  const [stateLabelStr, setStateLabelStr] = useState(`["0", "1", "2", "3"]`);

  return (
  <Layout>
    <h1>Markov Chains</h1>
    
    <label htmlFor="TransitionMatrix">Transition Matrix</label>
<br/>
    <textarea
      rows={10}
      cols={80}
      id="TransitionMatrix"
      style={{backgroundColor: (parseOk? "#FFF": "#FDD")}}
      value={matval} onChange={(e)=>{
        setMatVal(e.target.value)
      try {
        var p = e.target.value
        var t = eval(p)
      } catch (err) {
        setParseOk(false);
        setErrMsg("Syntax Error");
        return;
      }
      if (!(t instanceof Array)) {
        setParseOk(false)
        setErrMsg("Not an array")
        return
      }
      for (var i = 0; i < t.length; i++) {
        if (!(t instanceof Array)) {
          setParseOk(false)
          setErrMsg("Not a 2D array")
          return
        }
      }
      setMat((t_prev) => {
        if (t_prev.length !== t.length) {
          setChildKey(prev => prev + 1);
        }
        return t
      })
      setParseOk(true);
      setErrMsg("");
    }}></textarea>
    <br/>
    <label htmlFor="StateLabels">State Labels</label><br/>
    <input id="StateLabels"
    value={stateLabelStr} onChange={(e)=>{
      setStateLabelStr(e.target.value)
      try {
      var t = eval(e.target.value)
      setStateLabels(t)
      } catch (err) {
      }
    }} style={{fontSize:"100%", fontFamily:"monospace", width:"100%"}} />
    <div style={{color: "#F55"}}>{errMsg}</div>
    <button onClick={(e) => {
      var newMat = JSON.parse(JSON.stringify(mat))
      var n = mat.length;
      for (var i = 0; i < n; i++) {
        newMat[i].push(0.0);
      }
      newMat.push(Array.from({length: n+1}, (v, i) => 0))
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)
      setChildKey(prev => prev+1)
    }}>+ State</button>
    <button>- State</button>
    <button>Normalize Rows</button>
    <div style={{display: "absolute"}}>
      <StateDiagram key={childKey} mat={mat} lbls={stateLabels} />
    </div>
  </Layout>
)};

export const Head = () => <Seo title="Page two" />

export default MarkovPage

const make_path = (x, y) => `M ${x-25},${y}
a 25,25 0 1,1 50, 0
a 25,25 0 1 ,1 -50, 0
`;
const make_curve = (val, isloop, ax, ay, bx, by) => {
  if (val === 0) return ``;
  var r = 25;
  var theta=25*Math.PI/180;
  if (isloop) {
    var aax = ax+r*Math.cos(Math.PI/2-theta)
    var aay = ay-r*Math.sin(Math.PI/2-theta)
    var bbx = bx+r*Math.cos(Math.PI/2+theta)
    var bby = by-r*Math.sin(Math.PI/2+theta)

    var x1 = ax + r * 4.5 * Math.cos(Math.PI/2-theta);
    var y1 = ay - r * 4.5 * Math.sin(Math.PI/2-theta);
    var x2 = ax + r * 4.5 * Math.cos(Math.PI/2+theta);
    var y2 = ay - r * 4.5 * Math.sin(Math.PI/2+theta);
    
    return `M ${aax} ${aay}
    C ${x1} ${y1}, ${x2} ${y2}, ${bbx} ${bby} 
    L ${bbx + r/2*Math.cos(Math.PI/2)} ${bby - r/2*Math.sin(Math.PI/2)}
    M ${bbx} ${bby}
    L ${bbx + r/2*Math.cos(Math.PI/2 + 2*theta)} ${bby - r/2*Math.sin(Math.PI/2+2*theta)}`;
  } else {

    var mx = (ax + bx) / 2;
    var my = (ay + by) / 2;
    var tx = - (by - ay) / 2 * Math.sin(1.2*theta);
    var ty = + (bx - ax) / 2 * Math.sin(1.2*theta);

    var t0 = Math.atan2(-(by - ay), bx - ax);
    var aax = ax+r*Math.cos(t0 - theta);
    var aay = ay-r*Math.sin(t0 - theta);
    var bbx = bx+r*Math.cos(t0 + theta + Math.PI);
    var bby = by-r*Math.sin(t0 + theta + Math.PI);

    // M ${ax} ${ay} L ${bx} ${by}
    return `M ${aax} ${aay} 
    Q ${mx+tx} ${my+ty}, ${bbx} ${bby}
    L ${bbx - r/2*Math.cos(t0)} ${bby + r/2*Math.sin(t0)}
    M ${bbx} ${bby}
    L ${bbx - r/2*Math.cos(t0 + 2*theta)} ${bby + r/2*Math.sin(t0 + 2*theta)}
    `;
  }
}

const StateDiagram = ({mat, lbls}) => {
  var n = mat.length;
  var [coords, api] = useSprings(n, (i) => ({
      x: 50 + i * 600/n,
      y: 100,
      d: make_path(50 + i * 600/n, 100)
  }), [mat.length, lbls])
  var [edges, api2] = useSprings(n*n, (eid) => {
    var i = Math.floor(eid / n);
    var j = eid % n;
    var val = mat[i][j];

    return {
      val: val,
      stroke: `rgba(48, 48, 48, ${val})`,
      d: make_curve(val, i===j,
        coords[i].x.get(),
        coords[i].y.get(),
        coords[j].x.get(),
        coords[j].y.get())
    }
  }, [coords])

  const fn = (targetIdx, nx, ny, nd, down) => (i) => (
    i === targetIdx
    ? {
        x: nx,
        y: ny,
        d: nd,
        immediate: down
      }
    : {
        x: coords[i].x.goal,
        y: coords[i].y.goal,
        d: coords[i].d.goal, 
        immediate: down
      }
  );

  const fn2 = (targetIdx, nx, ny, down) =>
  (eid) => {
    var i = Math.floor(eid / n);
    var j = eid % n;
    var val = mat[i][j];
    
    return {
      val: val,
      stroke: `rgba(48, 48, 48, ${val})`,
      d: make_curve(val, i===j,
        (i===targetIdx? nx : coords[i].x.goal),
        (i===targetIdx? ny : coords[i].y.goal),
        (j===targetIdx? nx : coords[j].x.goal),
        (j===targetIdx? ny : coords[j].y.goal)),
      immediate: down,
      duration: 0,
    }
  };

  var [lastEventTime, setLastEventTime] = useState(0);
  var bind = useDrag((e) => {
    // console.log(e)
    var i = e.args[0]
    
    // if (Date.now() - e.time >= 100) {
    //   console.log("DROP")
    //   return;
    // }
    // if (e.time - lastEventTime < 100) {
    //   console.log("TOOCLOSE")
    //   return;
    // }
 
    // setLastEventTime(e.time)
    // console.log("meow", e.time, Date.now())

    var down = e.down
    //var mx = e.delta[0] - (e.previous[0] - e.initial[0])
    //var my = e.delta[1] - (e.previous[1] - e.initial[1])
    var mx = e.delta[0]
    var my = e.delta[1]
    if (mx === 0 && my === 0) return;
    var nx = coords[i].x.goal + mx 
    var ny = coords[i].y.goal + my
    var nd = make_path(nx, ny)
    api.start(fn(i, nx, ny, nd, down))
    api2.start(fn2(i, nx, ny, down))
  });


  
  var objs = []
  for (var eid = 0; eid < n * n; eid++) {
    var d = edges[eid].d
    var stroke = edges[eid].stroke
    objs.push((
      <g key={n+eid}>
        <animated.path d={d}
        stroke={stroke} strokeWidth="5px" 
        strokeLinecap="round"
        fill="none" 
        />
      </g>
    ))
  }
  for (var i = 0; i < n; i++) {
    var x = coords[i].x
    var y = coords[i].y
    var d = coords[i].d
    //coords.map(({ x, y, d }, i) => 
    objs.push((
    <g key={i}><animated.path d={d}
    stroke="#333" strokeWidth="5px" 
    fill="white"
    {...bind(i)}
    />
    <animated.text x={x} y={y} className="svgtext" dominantBaseline="middle" textAnchor="middle" style={{fontSize:"150%",
     pointerEvents: "none"}}
    >{lbls[i]||i}</animated.text>
    </g>
    ));
    }
  
  return (
    <svg width="100%" height="400" viewBox="0 0 600 400">
      {objs}
    </svg>
  );
}
