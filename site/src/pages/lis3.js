import * as React from "react"
import {Component, useState} from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../components/lis.css"
import { animated, SpringValue } from '@react-spring/web'
import { faJournalWhills } from "@fortawesome/free-solid-svg-icons"



const SecondPage = () => {
  // const [data, setData] = useState([1, 2, 10, 14, 8, 3, 4, 7, 13, 12, 5, 9, 15, 16, 11, 6]);
  // const [data, setData] = useState([1, 2, 10, 14, 8, 3, 4, 7]);
  const [data, setData] = useState([13, 12, 5, 9, 15, 16, 11, 6]);
  const randomPermute = () => {
    var p = []
    for (var i = 0; i < 16; i++) p.push(i+1);
    for (var i = 0; i < 16; i++) {
      var j = Math.floor(Math.random() * (16 - i)) + i;
      [p[i], p[j]] = [p[j], p[i]];
    }
    setData(p)
  };
  return (
  <Layout>
    <h1>Length Of LIS</h1>
    <button onClick={randomPermute.bind(this)}>Change a Permutation</button>
    <ShowLIS N={16} data={data}/>
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
    var n = props.data.length;
    var N = props.N;
    this.state={
      viewdif: false
    };
    // this.springLeft = []
    // this.springTop = []
    // this.springBackgroundColor = []
    // this.springBorderColor = []
    // for(var i = 0; i < n ;i++) {
    //   this.springLeft.push(new SpringValue(i*60));
    //   this.springTop.push(new SpringValue(300));
    //   this.springBackgroundColor.push(new SpringValue(`rgb(90%,90%,90%)`))
    //   this.springBorderColor.push(new SpringValue("#777777"))
    // }
    this.springBG = {};
    for(var i=0;i<=N;i++)
    for(var j=0;j<=N;j++) this.springBG[[i,j]] = new SpringValue(`rgb(90%,90%,90%)`);
  }

  toggleView() {
    var state = {...this.state}
    state.viewdif = !state.viewdif
    this.setState(state);
  }

  getlislen(data) {
    var lis=[]
    for(var i=0;i<data.length;i++) {
      if(lis.length===0 || lis[lis.length-1]<data[i]) lis.push(data[i])
      else {
        for(var j=0;j<data.length;j++) {
          if(lis[j] >= data[i]) {
            lis[j] = data[i];
            break;
          }
        }
      }
    }
    return lis.length;
  }
  
  render() {
    const data = this.props.data;
    const n = data.length;
    const N = this.props.N;
    // var fromlis = this.computeLisByStep(this.state.prevstep, data);

    var tabl = {}
    var squares = [];
    for(var i=0;i<=N;i++) {
      for(var j=i;j<=N;j++) {
        var d = []
        for(var k=0;k<n;k++) if(data[k]>=i+1 && data[k]<=j) {
          d.push(data[k])
        }
        var q = this.getlislen(d)
        
        if (this.state.viewdif === false) {
          tabl[[i,j]] = q
          this.springBG[[i,j]].start(`rgb(${100}%,${30+(100-30)*(N-q)/N}%,${30+(100-30)*(N-q)/N}%)`);
        } else {
          q = (i<=j? j-i-q : 0);
          tabl[[i,j]] = q
          this.springBG[[i,j]].start(`rgb(${13+(100-13)*(N-q)/N}%,${54+(100-54)*(N-q)/N}%,${13+(100-13)*(N-q)/N}%)`);
        }
        squares.push(<animated.div style={{
          display:"inline-flex",
          justifyContent:"center",alignItems:"center",
          width:"30px",
          height:"30px",
          fontSize:"20px",
          position:"absolute",
          //borderWidth:"2px",
          //borderStyle:"solid",
          top:i*30,
          left:j*30,
          backgroundColor: this.springBG[[i,j]],
          color:(i===j?'#DDD':'#000'),
        }}>{tabl[[i,j]]}</animated.div>
        )
      }
    }
    var P=[]
    for(var i=0;i<N;i++) {
      var c = "x";
      for(var j=1;j<=N;j++) {
      if(tabl[[i,j]] > tabl[[i,j-1]] && tabl[[i,j]] > tabl[[i+1,j]]) {
        c = j;
        break;
      }
    }
      P.push(c);
    }

    var vstr = (this.state.viewdif? "Diff View" : "LIS View");
    var Pstr = P.join(",");

    return (<>
    <p></p>
    <p style={{fontSize:"20px",fontFamily:"Courier"}}>Data: {JSON.stringify(data)}</p>

    <h2>Current View: {vstr}</h2>
    <p style={{fontSize:"20px",fontFamily:"Courier"}}>P = {Pstr}</p>
    <div style={{position:"relative",height:"480px"}}>
      {squares}
    </div>
    <button onClick={this.toggleView.bind(this)}>Toggle View</button>
    </>);
  }
}