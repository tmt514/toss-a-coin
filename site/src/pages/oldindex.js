import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

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
      seq: -1,
      currentCoinIndex: -1,
      currentScriptStep: 0,
      currentScriptInnerStep: 0,
      tossed: 0,
      heads: 0,
      tails: 0,
      message: "",
      hasError: false,
      done: false,
    };
    return {...state};
  }
  constructor(props) {
    super(props);
    this.tosslimit = 1000;
    this.state = Simulator.GetDefaultState();
  }

  tick() {
    console.log("TICK!");
    var state = {...this.state};
    if (state.seq !== this.props.seq) return;
    if (state.done === true) return;
    if (state.hasError === true) return;
    var callback = () => {
      var id = setTimeout(this.tick.bind(this), 1);
      window.allTimeOuts.push(id);
    };

    if (state.tossed >= this.tosslimit) {
      state.done = true;
      state.message = "Simulation finished because number of tossed coins reaches the limit."
      this.setState(state, callback);
      return;
    }
    if (this.props.cmds.length <= state.currentScriptStep) {
      state.done = true;
      state.message = "Simulation finished because there is no more command."
      this.setState(state, callback);
      return;
    }

    var cmd = this.props.cmds[state.currentScriptStep];
    if (cmd === undefined) {
      state.hasError = true;
      state.message = "Cannot find next command!";
      console.log(state);
      this.setState(state, callback);
      return;
    }
    else if (cmd[0] === "Draw") {

      state.currentCoinIndex = Math.floor(Math.random() * this.props.urn.length);
      state.currentScriptStep += 1;
      this.setState(state, callback);
      return;

    } else if (cmd[0] === "Toss") {
      if (!(state.currentCoinIndex >= 0 && state.currentCoinIndex < this.props.urn.length)) {
        state.hasError = true;
        state.message = "You do not have a coin at hand!";
        this.setState(state, callback);
        return;
      }

      var looptimes = this.tosslimit;
      if (cmd.length >= 2) {
        if (cmd[1] === "") looptimes = this.tosslimit;
        else 
        looptimes = parseInt(cmd[1]);
      }
      if (state.currentScriptInnerStep >= looptimes) {
        state.currentScriptStep += 1;
        state.currentScriptInnerStep = 0;
        this.setState(state, callback);
        return;
      }

      state.currentScriptInnerStep += 1;
      state.tossed += 1;
      var p = this.props.urn[state.currentCoinIndex];
      if (Math.random() <= p) {
        state.heads += 1;
      } else {
        state.tails += 1;
      }
      this.setState(state, callback);


    } else if (cmd[0] === "DrawAnotherCoin") {

      if (this.props.urn.length <= 1) {
        state.hasError = true;
        state.message = "There is no more coin in the urn!";
        this.setState(state, callback);
        return;
      }
      
      
      var newCoin = Math.floor(Math.random() * this.props.urn.length);
      var cnt=0;
      while (newCoin === state.currentCoinIndex) {
        newCoin = Math.floor(Math.random() * this.props.urn.length);
        cnt++;
        if (cnt > 10) break; // stupid bug
        console.log(newCoin, this.props.urn);
      }

      state.currentCoinIndex = newCoin;
      state.currentScriptStep += 1;
      this.setState(state, callback);
    } else {
      console.log("Unknown Command!");
      state.hasError = true;
      this.setState(state, callback);
    }


  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.allowToStart === true) {
      var id = setTimeout(this.tick.bind(this), 5);
      window.allTimeOuts.push(id);
    }
  }

  componentDidUpdate() {
    if (this.props.allowToStart === true && this.props.seq !== this.state.seq) {
      var state = Simulator.GetDefaultState();
      state.seq = this.props.seq;
      this.setState(state, () => {
        var id = setTimeout(this.tick.bind(this), 5);
        window.allTimeOuts.push(id);
      });
    }
  }

  render() {
    var vh = this.state.heads / this.state.tossed;
    var vt = this.state.tails / this.state.tossed;
    return (
      <div>
        {/* 
        coin: {this.state.currentCoinIndex}<br/>
        inner idx: {this.state.currentScriptInnerStep}<br/>
        idx: {this.state.currentScriptStep}<br/>
        */}
        <p className={this.state.hasError? "toss-error": "toss-msg"}>{this.state.message}</p>
        Tossed Coins: {this.state.tossed}<br/>
        Heads: {this.state.heads} ({(vh*100.0).toFixed(2)}%)<br/>
        Tails: {this.state.tails} ({(vt*100.0).toFixed(2)}%)<br/>
        </div>
    );
  }
}


class WorkingArea extends React.Component {
  constructor(props) {
    super(props)
    var initstate = {
      urn: [0.3, 0.7],
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

  runSimulation() {
    if (window.allTimeOuts !== undefined) {
      for (var id of window.allTimeOuts) {
        window.clearTimeout(id);
      }
    }
    window.allTimeOuts = [];
    
    var state = {...this.state};
    state.trialSeq += 1;
    state.allowToStart = true;
    this.setState(state);
  }

  render() {
    return (<div>
      <p>
      <label>
        <b>Commands:</b><br/>
      <textarea id="toss-workarea" className="toss" ref={this.textareaRef} onChange={this.changeCommand.bind(this)} value={this.state.command} />
      </label>
      </p>
      <button className={this.state.hasError? "toss-error": "toss"} disabled={this.state.hasError}
      onClick={this.runSimulation.bind(this)}
      >Run Simulation</button>
      <p className={this.state.hasError? "toss-error":"toss-msg"}>
        {this.state.message}
      </p>
      <Simulator seq={this.state.trialSeq} urn={this.state.urn} cmds={this.state.scriptCommands} allowToStart={this.state.allowToStart}></Simulator>
    </div>)
  }
}

class TossCoinMain extends React.Component {
  componentDidMount() {
    console.log(window.MathJax);
    window.MathJax.typeset();
  }
  render() {
    return (<Layout>
      <h1>Coin Tossing Simulation</h1>
      <p>
        <b>Instructions.</b> You are given an urn with two biased coins $p=0.7$ and $p=0.3$.
      </p>
      <WorkingArea></WorkingArea>
    </Layout>)
  }
}



export default TossCoinMain
