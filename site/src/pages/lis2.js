import * as React from "react"
import {Component, useState} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../components/lis.css"
import { animated, SpringValue } from '@react-spring/web'



const SecondPage = () => {
  const [data, setData] = useState([0, 2, 10, 14, 8, 3, 4, 7, 13, 12, 5, 9, 15, 1, 11, 6]);
  const randomPermute = () => {
    var p = []
    for (var i = 0; i < 16; i++) p.push(i);
    for (var i = 0; i < 16; i++) {
      var j = Math.floor(Math.random() * (16 - i)) + i;
      [p[i], p[j]] = [p[j], p[i]];
    }
    setData(p)
  };
  return (
  <Layout>
    <h1>Frontier-Removal Algorithm</h1>
    <button onClick={randomPermute.bind(this)}>Change a Permutation</button>
    <ShowLIS data={data}/>
  </Layout>
)};

export const Head = () => <Seo title="Page two" />

export default SecondPage

class ShowLIS extends Component {
  

  computeLisByStep(step, data) {
    var n = data.length;
    var lis = []
    var pos = {}
    var depth = {}
    for(var i=0;i<n;i++) {
      depth[i]=0;
      pos[i] = i;
    }
    for (var i = 0; i < step; i++) {
      if (lis.length === 0 || data[lis[lis.length-1]] < data[i]) {
        lis.push(i);
        pos[i] = lis.length-1;
        depth[i] = 1;
      } else {
        for (var j = 0; j < lis.length; j++) {
          if (data[lis[j]] >= data[i]) {
            depth[i] = depth[lis[j]]+1;
            lis[j] = i;
            pos[i] = j;
            break;
          }
        }
      }
    }
    return {lis: lis, pos: pos, depth: depth};
  }

  constructor(props) {
    super(props);
    this.state = {
      prevstep: 0,
      step: 8,
    }
    var n = props.data.length;
    this.springLeft = []
    this.springTop = []
    this.springBackgroundColor = []
    this.springBorderColor = []
    for(var i = 0; i < n ;i++) {
      this.springLeft.push(new SpringValue(i*60));
      this.springTop.push(new SpringValue(300));
      this.springBackgroundColor.push(new SpringValue(`rgb(90%,90%,90%)`))
      this.springBorderColor.push(new SpringValue("#777777"))
    }
  }

  nextStep() {
    var state = {...this.state};
    state.prevstep = state.step;
    state.step += 1;
    if (state.step > this.props.data.length)
      state.step = this.props.data.length;
    this.setState(state);
  }
  resetStep() {
    var state = {...this.state};
    state.prevstep = state.step;
    state.step = 0;
    this.setState(state);
  }
  
  render() {
    const data = this.props.data;
    const n = data.length;
    // var fromlis = this.computeLisByStep(this.state.prevstep, data);
    var tolis = this.computeLisByStep(this.state.step, data);
    for (var i=0;i<n;i++) {
      if (tolis.depth[i] !== 0) {
        var pos = tolis.pos[i];
        this.springLeft[i].start(tolis.pos[i]*70);
        this.springTop[i].start(Math.log(1 + tolis.depth[tolis.lis[tolis.pos[i]]] - tolis.depth[i])*35);
        this.springTop[i].start((tolis.depth[i] - tolis.depth[tolis.lis[tolis.pos[i]]])*60 + 300);
        this.springBackgroundColor[i].start(`rgb(${100*(n-pos)/n}%,${24+(100-24)*(n-pos)/n}%,${70+(100-70)*(n-pos)/n}%)`)
        this.springBorderColor[i].start("#22339A");
      } else {
        this.springLeft[i].start(i*60);
        this.springTop[i].start(300);
        this.springBackgroundColor[i].start(`rgb(90%,90%,90%)`);
        this.springBorderColor[i].start("#777777");
      }
    }
    
    var squares = [];
    for(var i = 0; i < n; i++) {
      // var dlevel = (depth[i]===0? -1 : depth[lis[pos[i]]] - depth[i]);

      squares.push(
        <animated.div style={{
          display:"inline-flex",
          width:"60px",
          height:"60px",
          position:"absolute",
          left:this.springLeft[i],
          top:this.springTop[i],
          backgroundColor:this.springBackgroundColor[i],
          borderColor:this.springBorderColor[i],
          borderWidth:"2px",
          borderStyle:"solid",
          fontSize:"40px",
          justifyContent:"center",alignItems:"center"}}>{data[i]}</animated.div>
      );
    }

    

    return (<>
    <p>Data: {JSON.stringify(data)}</p>
    <div style={{position:"relative",height:"400px"}}>
      {squares}
    </div>
    <button onClick={this.nextStep.bind(this)}>Next Step</button>
    <button onClick={this.resetStep.bind(this)}>Reset</button>
    </>);
  }
}



function Tile(dlevel, pos, data, n) {
  var bgcolor = '#FFF';
  var border = "2px solid #D4AF37";
  var left = pos*70;
  var top = dlevel*35;
  if (dlevel === -1) {
    bgcolor = "#DDD";
    border = '2px solid #777';
    left = pos*60;
    top = 300;
  } else {
    bgcolor = `rgb(${100}%,${74+(100-74)*(n-pos)/n}%,${100*(n-pos)/n}%)`;
  }
  return (
    <div className="listile" style={{
      display:"inline-flex",
      width:"60px",
      height:"60px",
      position:"absolute",
      left:left,top:top,
      backgroundColor:bgcolor,
      border:border,
      fontSize:"40px",
      justifyContent:"center",alignItems:"center"}}>{data}</div>
  );
}
