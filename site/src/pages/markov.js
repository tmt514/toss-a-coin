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

  const checkMatrixAndSetErrorState = (t) => {
    if (!(t instanceof Array)) {
      setParseOk(false)
      setErrMsg("Not an array")
      return false
    }
    var someRowLargerThanOne = false;
    for (var i = 0; i < t.length; i++) {
      
      if (!(t[i] instanceof Array)) {
        setParseOk(false)
        setErrMsg("Not a 2D array")
        return false
      }
  
      if (!(t[i].length === t.length)) {
        setParseOk(false)
        setErrMsg("The transition matrix is not a square matrix.")
        return false
      }
  
      var sumv = 0;
      for (var j = 0; j< t.length; j++) {
        sumv += t[i][j]
      }
      if (sumv > 1.0) {
        someRowLargerThanOne = true;
      }
    }
    if (someRowLargerThanOne) {
      setParseOk(false)
      setErrMsg("Some row has larger than 1 total probability.")
    } else {
      setParseOk(true);
      setErrMsg("");
    }
    return true;
  }


  var isAbsorbing = false;
  var isLeaking = false;
  for (var i = 0; i < mat.length; i++) {
    var sumv = 0;
    for (var j = 0; j < mat.length; j++) sumv += mat[i][j];
    if (sumv < 1.0) { isAbsorbing = true; isLeaking = true; }
    if (mat[i][i] === 1.0) isAbsorbing = true;
  }

  return (
  <Layout>
    <h1>Markov Chains</h1>
    
    <label htmlFor="TransitionMatrix">Transition Matrix</label>
<br/>
    <textarea
      rows={8}
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
      var checkResult = checkMatrixAndSetErrorState(t)
      if (!checkResult) return;

      setMat((t_prev) => {
        if (t_prev.length !== t.length) {
          setChildKey(prev => prev + 1);
        }
        return t
      })
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
    <button onClick={(e)=> {
      var newMat = JSON.parse(JSON.stringify(mat))
      var n = mat.length;
      for (var i = 0; i < n; i++) {
        newMat[i].pop();
      }
      newMat.pop();
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)
      setChildKey(prev => prev+1)
    }}>- State</button>
    <button onClick={(e)=>{
      var newMat = JSON.parse(JSON.stringify(mat))
      var n = mat.length;
      for (var i = 0; i < n; i++) {
        var sumv = 0;
        for (var j = 0; j < n; j++) {
          sumv += newMat[i][j];
        }
        if (sumv > 0) {
          for (var j = 0; j < n; j++) {
            newMat[i][j] /= sumv;
          }
        }
      }
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)

      if (!checkMatrixAndSetErrorState(newMat)) { console.log("HERE"); return; }
      setChildKey(prev => prev+1)
    }}>Normalize Rows</button>
    <div>
    <button onClick={(e)=>{
      var newMat = [[0.5, 0.5], [0, 1]];
      setStateLabels(["start", "H"])
      setStateLabelStr(`["start", "H"]`)
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)
      setChildKey(prev => prev+1)
    }}>Example 1: Toss Coin Until See H.</button>
    <button onClick={(e)=>{
      var newMat = [[0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0, 1.0]];
      setStateLabels(["start", "H", "HH"])
      setStateLabelStr(`["start", "H", "HH"]`)
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)
      setChildKey(prev => prev+1)
    }}>Example 2: Toss Coin Until See HH.</button>
    <button onClick={(e)=>{
      var newMat = [[0, 0.5, 0.2, 0.3], [0, 0.5, 0.3, 0.2], [0, 0.5, 0.2, 0.3], [0, 0, 0, 1]];
      setStateLabels(["start", "odd", "even", "done"])
      setStateLabelStr(`["start", "odd", "even", "done"]`)
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)
      setChildKey(prev => prev+1)
    }}>Example 3: Generate Digits Until Multiple of 4.</button>
    <button onClick={(e)=>{
      var newMat = [[0.3, 0.7], [0.7, 0.3]];
      setStateLabels(["0", "1"])
      setStateLabelStr(`["0", "1"]`)
      setMat(newMat)
      var newMatVal = matToString(newMat)
      setMatVal(newMatVal)
      setChildKey(prev => prev+1)
    }}>Example 4: Rainfall</button>
    </div>
    <div>
      <h2>{isAbsorbing? "Simulation (Absorbing Chain)" : "Simulation"}</h2>
      <Simulator key={childKey} mat={mat} lbls={stateLabels} absorbing={isAbsorbing} leaking={isLeaking} />
    </div>
    <div style={{display: "absolute"}}>
      <StateDiagram key={childKey} mat={mat} lbls={stateLabels} />
    </div>
  </Layout>
)};

const Simulator = ({mat, lbls, absorbing, leaking}) => {
  const n = mat.length + (leaking? 1 : 0);
  const [start, setStart] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [statInRound, setStatInRound] = useState(Array.from({length: n}, (v, i)=> 0));
  const [statAbsorbing, setStatAbsorbing] = useState(Array.from({length: n}, (v, i)=> 0));
  const [totalStepCount, setTotalStepCount] = useState(0);
  const [averageSteps, setAverageSteps] = useState(0);

  const resetAll = () => {
    setTotalStepCount(0);
    setIsSimulating(false);
    setCurrentState(start);
    setStepCount(0);
    setRoundCount(0);
    setStatInRound(Array.from({length: n}, ()=> 0));
    setStatAbsorbing(Array.from({length: n}, ()=> 0));
    setTotalStepCount(0);
    setAverageSteps(0);
  }


  useEffect(() => {
    if (isSimulating) {
      var n = mat.length;
      if (currentState === n || mat[currentState][currentState] === 1.0) {
        // absorbing.
        setStatAbsorbing(s => {
          var t = [...s]
          t[currentState] += 1
          return t
        })
        setRoundCount(prev => prev+1);
        setAverageSteps((totalStepCount / (roundCount + 1)).toFixed(5));
        setTotalStepCount(prev => prev + stepCount)
        setStepCount(0);
        var s = Array.from({length: mat.length + (leaking? 1: 0)}, (v, i)=> 0)
        setStatInRound(s);
        setCurrentState(start);
        return;
      }

      var p = Math.random();
      var n = mat.length;
      var nxtState = n;
      for (var j = 0; j < n; j++) {
        if (p < mat[currentState][j]) {
          nxtState = j;
          break;
        } else {
          p -= mat[currentState][j];
        }
      }
      setCurrentState(nxtState);
      setStepCount(prev => prev+1);
      setStatInRound(s => {
        var t = [...s]
        t[currentState] += 1
        return t
      })
    }
  }, [stepCount, totalStepCount, isSimulating]);


  
  var sumv = stepCount;
  return (<>
  <div style={{margin: "5px"}}>
  <button onClick={()=>setIsSimulating((on) => !on)}>Go / Pause</button>
  <button onClick={()=>resetAll()}>Reset</button>
  </div>
  {absorbing && (<div>Round: <tt>{roundCount}</tt>  (Average Steps: {averageSteps})</div>)}
  <div>Step: {stepCount}</div>
  <div className="markov-sim-result">
    <table>
      <thead>
      <tr>
        <td></td>
        {statInRound.map((v, i) => (<th key={i}>{lbls[i]||"?"}</th>))}
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>Step Count</th>
        {statInRound.map((v, i) => (<td key={i}>{v}</td>))}
      </tr>
      <tr>
        <th>Step Ratio</th>
        {statInRound.map((v, i) => (<td key={i}>{(v/sumv).toFixed(5)}</td>))}
      </tr>
      {absorbing && 
      (<tr>
        <th>Absorbing Count</th>
        {statAbsorbing.map((v, i) => (<td key={i}>{v}</td>))}
      </tr>
      )
      }
      </tbody>
    </table>
  </div>
  </>)
}

export const Head = () => <Seo title="Page two" />

export default MarkovPage

const make_path = (x, y) => `M ${x-25},${y}
a 25,25 0 1,1 50, 0
a 25,25 0 1 ,1 -50, 0
`;
const make_curve = (val, isloop, ax, ay, bx, by) => {
  //if (val === 0) return ``;
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
  }), [mat.length])
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
    }
  };

  var [lastEventTime, setLastEventTime] = useState(0);
  var bind = useDrag((e) => {
    var i = e.args[0]
    var down = e.down
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
    fill={mat[i][i] === 1.0? "#FCC":"#FFF"}
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
