import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRotateLeft,
  faHandLizard,
  faPlay,
  faForward,
  faMagicWandSparkles,
  faPause,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  animation: {
    duration: 1,
  },
  scales: {
    y: {
      min: 0.0,
      max: 1.0,
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const links = [
  {
    text: "Tutorial",
    url: "https://www.gatsbyjs.com/docs/tutorial",
    description:
      "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
  },
  {
    text: "Examples",
    url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
    description:
      "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
  },
  {
    text: "Plugin Library",
    url: "https://www.gatsbyjs.com/plugins",
    description:
      "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
  },
  {
    text: "Build and Host",
    url: "https://www.gatsbyjs.com/cloud",
    description:
      "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
  },
]

const samplePageLinks = [
  {
    text: "Page 2",
    url: "page-2",
    badge: false,
    description:
      "A simple example of linking to another page within a Gatsby site",
  },
  { text: "TypeScript", url: "using-typescript" },
  { text: "Server Side Rendering", url: "using-ssr" },
  { text: "Deferred Static Generation", url: "using-dsg" },
]

const moreLinks = [
  { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
  {
    text: "Documentation",
    url: "https://gatsbyjs.com/docs/",
  },
  {
    text: "Starters",
    url: "https://gatsbyjs.com/starters/",
  },
  {
    text: "Showcase",
    url: "https://gatsbyjs.com/showcase/",
  },
  {
    text: "Contributing",
    url: "https://www.gatsbyjs.com/contributing/",
  },
  { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
]

const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = () => (
  <Layout>
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt=""
        style={{ marginBottom: `var(--space-3)` }}
      />
      <h1>
        Welcome to <b>Gatsby!</b>
      </h1>
      <p className={styles.intro}>
        <b>Example pages:</b>{" "}
        {samplePageLinks.map((link, i) => (
          <React.Fragment key={link.url}>
            <Link to={link.url}>{link.text}</Link>
            {i !== samplePageLinks.length - 1 && <> · </>}
          </React.Fragment>
        ))}
        <br />
        Edit <code>src/pages/index.js</code> to update this page.
      </p>
    </div>
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}${utmParameters}`}
          >
            {link.text} ↗
          </a>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      ))}
    </ul>
    {moreLinks.map((link, i) => (
      <React.Fragment key={link.url}>
        <a href={`${link.url}${utmParameters}`}>{link.text}</a>
        {i !== moreLinks.length - 1 && <> · </>}
      </React.Fragment>
    ))}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

class Simulator extends React.Component {

  static GetDefaultState() {
    var state = {
      cmdQueue: [],
      coinSeq: 0,
      currentCoinIndex: -1,
      currentScriptInnerStep: 0,
      tossed: 0,
      heads: 0,
      tails: 0,
      message: "",
      history: [],
      historyHeadsProb: [],
      historyCoinSeq: [],
      hasError: false
    };
    return {...state};
  }
  constructor(props) {
    super(props);
    this.tosslimit = 1000;
    this.state = Simulator.GetDefaultState();
    this.state.currentCoinIndex = Math.floor(Math.random() * props.urn.length);
  }

  componentDidMount() {
    window.allTimeOuts = [];
  }

  tick() {
    console.log("TICK!");
    var state = {...this.state};
    if (state.cmdQueue.length === 0) return;

    var callback = () => {
      var id = setTimeout(this.tick.bind(this), 1);
      window.allTimeOuts.push(id);
    };

    if (state.tossed >= this.tosslimit) {
      state.cmdQueue = [];
      state.message = "Simulation finished because number of tossed coins reaches the limit."
      this.setState(state, callback);
      return;
    }

    var cmd = state.cmdQueue[0];
    if (cmd[0] === "Toss") {
      
      // speed up tossing.
      var repeat = 1;
      if (cmd[1] >= 20 || (cmd[1] >= 6 && cmd[1] + state.tossed >= this.tosslimit)) repeat = 6;

      while (repeat > 0) {
        repeat -= 1;

        // simulate here.
        state.tossed += 1;
        var p = this.props.urn[state.currentCoinIndex];
        if (Math.random() <= p) {
          state.heads += 1;
          state.history.push(1);
          state.historyHeadsProb.push(state.heads / state.tossed);
          state.historyCoinSeq.push(state.coinSeq);
        } else {
          state.tails += 1;
          state.history.push(0);
          state.historyHeadsProb.push(state.heads / state.tossed);
          state.historyCoinSeq.push(state.coinSeq);
        }

        // update cmdQueue
        if (cmd[1] <= 1) {
          state.message = "Tossing coins..."
          state.cmdQueue.shift();
          if (state.cmdQueue.length === 0) {
            state.message = "Done!"
          }
        } else {
          state.message = "Tossing coins..."
          state.cmdQueue[0][1] -= 1;
        }
      }
      this.setState(state, callback);
    } else if (cmd[0] === "DrawAnotherCoin") {
      state.message = "OK draw another coin."
      

      var newCoin = Math.floor(Math.random() * this.props.urn.length);
      var cnt=0;
      while (newCoin === state.currentCoinIndex) {
        newCoin = Math.floor(Math.random() * this.props.urn.length);
        cnt++;
        if (cnt > 10) break; // stupid bug
        console.log(newCoin, this.props.urn);
      }

      state.coinSeq += 1;
      state.currentCoinIndex = newCoin;
      state.cmdQueue.shift();
      this.setState(state, callback);
    } else {
      console.log("Unknown Command!");
      state.message = "Unknown command."
      state.cmdQueue.shift();
      this.setState(state, callback);
    }


  }

  theUltimateCallback() {
    for (var id of window.allTimeOuts) {
      window.clearTimeout(id);
    }
    window.allTimeOuts = [];
    var id = setTimeout(this.tick.bind(this), 5);
    window.allTimeOuts.push(id);
  }

  restartSimulation() {
    var state = Simulator.GetDefaultState();
    state.currentCoinIndex = Math.floor(Math.random() * this.props.urn.length);
    this.setState(state, this.theUltimateCallback.bind(this));
  }
  drawAnotherCoin() {
    var state = {...this.state};
    state.cmdQueue.push(["DrawAnotherCoin"]);
    this.setState(state, this.theUltimateCallback.bind(this));
  }

  setupTossByCount(count) {
    var state = {...this.state};
    state.cmdQueue.push(["Toss", count]);
    this.setState(state, this.theUltimateCallback.bind(this));
  }
  toss() {
    var count = document.getElementById("toss-count").value;
    count=parseInt(count);
    this.setupTossByCount(count);
    return false
  }
  tossAll() {
    var count = this.tosslimit - this.state.tossed;
    this.setupTossByCount(count);
    return false
  }
  holdOn() {
    var state = {...this.state};
    state.cmdQueue = [];
    this.setState(state, this.theUltimateCallback.bind(this));
  }

  render() {
    var vh = this.state.heads / this.state.tossed;
    var vt = this.state.tails / this.state.tossed;
    var labels = [];
    var totaldata = [];
    var latestdata = [];
    var currentTossed = 0;
    var currentHead = 0;

    // for efficiency, we force chart to not update too frequently if there are waiting ticks.
    var still_running = false;
    if (this.state.cmdQueue.length > 0) {
      still_running = true;
    }
    
    for (var i = 1; i <= this.tosslimit; i++) {
      labels.push(i);
      if (i <= this.state.history.length) {
        totaldata.push(this.state.historyHeadsProb[i-1]);
        if (this.state.historyCoinSeq[i-1] === this.state.coinSeq) {
          currentTossed += 1;
          currentHead += (this.state.history[i-1]);
          latestdata.push(currentHead / currentTossed);
        } else {
          latestdata.push(null);
        }
        
      } else {
        totaldata.push(null);
        latestdata.push(null);
      }
    }
    var vc = currentHead / currentTossed;

    var chartdata = {
      labels,
      datasets: [
        {
          label: 'Overall',
          data: totaldata,
          borderColor: 'rgb(53, 162, 135)',
          backgroundColor: 'rgba(53, 162, 135, 0.5)',
        },
        {
          label: 'Latest',
          data: latestdata,
          borderColor: 'rgb(235, 99, 132)',
          backgroundColor: 'rgba(235, 99, 132, 0.5)',
        }
      ],
    };

    return (
      <div>
        <h2>Operation Panel</h2>
        <ul>
          <li><button className="toss restart"
        onClick={this.restartSimulation.bind(this)}>
        <FontAwesomeIcon icon={faRotateLeft} />
      </button> Restart Simulation</li>
        <li>
        <button className="toss draw"
      onClick={this.drawAnotherCoin.bind(this)}>
        <FontAwesomeIcon icon={faHandLizard} />
      </button>  Draw Another Coin</li>
      <li>
      <button className="toss toss-count" onClick={this.toss.bind(this)}>
        <FontAwesomeIcon icon={faPlay} />
      </button> Toss <input id="toss-count" defaultValue={1} /> Time(s).
      </li>
      <li>
      <button className="toss toss-all" onClick={this.tossAll.bind(this)}>
        <FontAwesomeIcon icon={faForward} />
      </button> Toss All Remaining {this.tosslimit - this.state.tossed} Coins.
      </li>
      <li>
      <button className="toss toss-all" onClick={this.holdOn.bind(this)}>
        <FontAwesomeIcon icon={faPause} />
      </button> Hold On
      </li>
        </ul>

        {/* 
        coin: {this.state.currentCoinIndex}<br/>
        inner idx: {this.state.currentScriptInnerStep}<br/>
        idx: {this.state.currentScriptStep}<br/>
        */}
        <h2>Result</h2>
        <p className={this.state.hasError? "toss-error": "toss-msg"}>{this.state.message}</p>
        Tossed Coins: {this.state.tossed}<br/>
        Heads: {this.state.heads} ({(vh*100.0).toFixed(2)}%)<br/>
        Tails: {this.state.tails} ({(vt*100.0).toFixed(2)}%)<br/>
        <span style={{color: '#888'}}>Heads for Latest Coin: {currentHead}/{currentTossed} ({(vc*100.0).toFixed(2)}%)</span><br/>
        <Line options={options} data={chartdata} />
        </div>
    );
  }
}

class UrnMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  say(n) {
    var p=["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
    if (n <= 12) {
      return p[n-1];
    } else {
      return n;
    }

  }
  render() {
    var urn_message = "You are given an urn with two biased coins $p=0.7$ and $p=0.3$.";
    var urn = this.props.urn;
    console.log("urn here", urn);
    if (urn.length === 2) {
      urn_message = "You are given an urn with two biased coins $p=" + urn[0] + "$ and $p=" + urn[1] + "$. ";
    } else if (urn.length > 2) {
      var avg = 0.0;
      for (var x of urn) avg += x;
      avg = avg / urn.length;
      avg = avg.toFixed(3);

      urn_message = "You are given an urn with "
      + this.say(urn.length) + " coins with an average head probability " + "$\\mathbf{E}[p]="+ avg + "$" + ". ";
    }

    var msg = urn_message + "You have drawn a coin from the urn, but you cannot tell which coin is which from its appearance. The goal is to toss as many heads as possible.";
    return (
    <p id="urn-message" dangerouslySetInnerHTML={{__html: msg}} />
    );
  }
}


class WorkingArea extends React.Component {
  constructor(props) {
    super(props)
    var initstate = {
      urn: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      command: "Draw()\nToss(500)\nDrawAnotherCoin()\nToss()",
      scriptCommands: [],
      msg: "",
      hasError: false,
      trialSeq: 0,
      allowToStart: false,
    };
    this.state = WorkingArea.parseCommand(initstate);
    this.textareaRef = React.createRef()
  }

  static parseCommand(state) {
    const instrSet = new Set(["Draw", "Toss", "DrawAnotherCoin"]);

    var str = state.command;
    var cmds = str.split(/\r?\n/);
    var cmdList = [];
    var hasError = false;
    var message = "";
    var lineNumber = 0;
    for (var seq of cmds) {
      lineNumber += 1;

      const regex = /^([A-Za-z]*)\((\d*)\)$/;
      var found = seq.match(regex);
      if (found === null || found === undefined) {
        hasError = true;
        message = "Syntax error at line " + lineNumber + ".";
        break;
      }
      if (found.length <= 1) {
        hasError = true;
        message = "Syntax error at line " + lineNumber + ".";
        break;
      }
      
      found.shift();
      
      if (!instrSet.has(found[0])) {
        hasError = true;
        message = "Command " + found[0] + " is not supported.";
        break;
      }
      cmdList.push(found);
    }

    state.scriptCommands = cmdList;
    state.hasError = hasError;
    state.message = message;

    return state;
  }

  changeCommand(e) {
    var val = e.target.value;
    var state = {...this.state};
    state.command = val;
    state = WorkingArea.parseCommand(state);
    this.setState(state);
  }

  redefineUrn() {
    if (window.allTimeOuts !== undefined) {
      for (var id of window.allTimeOuts) {
        window.clearTimeout(id);
      }
    }
    window.allTimeOuts = [];

    var val = document.getElementById("urn").value;
    var state = {...this.state};
    state.urn = eval(val);
    state.trialSeq += 1;
    this.setState(state);
  }

  componentDidUpdate() {
    window.MathJax.typeset();
    window.MathJax.typesetClear();
  }

  componentDidMount() {
    // setup useful functions for coin generation.
    window.linspace = ((min, max, N)=>{
      var a = [];
      N--;
      for(var i = 0; i <= N; i++) a.push(min+i*(max-min)/N);
      return a;
    });
    window.uniform_prior = ((N)=>{
      var a = [];
      for(var i = 0; i < N; i++) a.push(Math.random());
      return a;
    });
    window.normal_prior = ((N)=>{
      // box muller transform 
      // https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
      var bm = (() => {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) return bm() // resample between 0 and 1
        return num
      });
      var a = [];
      for(var i = 0; i < N; i++) a.push(bm());
      return a;
    });
  }
  

  render() {
    
    // if (document.getElementById('urn-message') !== null) {
    //   document.getElementById('urn-message'). innerHTML="";
    // }
    return (<div>
      <h2>Define Your Urn</h2>
      <p>
        <input id="urn" defaultValue="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]" />
        <button className="toss" onClick={this.redefineUrn.bind(this)}><FontAwesomeIcon icon={faMagicWandSparkles}/></button>
        <br/>
      <small>
        <b>Hint:</b> This is simply a javascript <tt>eval()</tt> without any protection (change with caution!) We have pre-defined some useful functions for you to use. Just  copy and paste the commands to the above input box, and then click on the magic icon.
        <br/>
        <FontAwesomeIcon icon={faSquare}/> <tt>linspace(0.0, 1.0, 1001)</tt><br/>
        <FontAwesomeIcon icon={faSquare}/> <tt>uniform_prior(1000)</tt><br/>
        <FontAwesomeIcon icon={faSquare}/> <tt>normal_prior(1000)</tt><br/>
      </small>
      </p>
      <h2>Instructions</h2>
      <UrnMessage urn={this.state.urn} />
      <Simulator seq={this.state.trialSeq} urn={this.state.urn} cmds={this.state.scriptCommands}></Simulator>
    </div>)
  }
}

class TossCoinMain extends React.Component {
  componentDidMount() {
    if (window.MathJax !== undefined) {
      window.MathJax.typeset();
      window.MathJax.typesetClear();
    }
  }
  render() {
    return (<Layout>
      <h1>Coin Tossing Simulation</h1>
      <WorkingArea></WorkingArea>
    </Layout>)
  }
}



export default TossCoinMain
