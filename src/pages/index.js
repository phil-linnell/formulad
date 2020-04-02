import React, { Component } from "react";
import { Global, css } from "@emotion/core";
import dice from "../utils/dice";

const cssGlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Catamaran', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    background-color: #222;
    color: white;
    -webkit-font-smoothing: antialiased;
  }
  button {
    outline: 0;
    cursor: pointer;
  }
`;

const cssIndex = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100vh;

  > div {
    flex: 1;
  }
`;

const cssHeader = css`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #000;
  margin-bottom: 10px;
  padding-left: 15px;
  font-size: 14px;

  h1 {
    font-size: 18px;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  em {
    color: #888;
    font-style: normal;
    margin-right: 5px;
  }
`;

const cssFooter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  line-height: 30px;
  margin-top: 10px;
`;

const cssDamage = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5vw;
  margin-right: 30px;

  button {
    background-color: #333;
    height: 30px;
    width: 30px;
    border: none;
    color: white;
    padding: 0;
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
  }
`;

const cssDamageNumber = css`
  text-align: center;
  width: 35px;
`;

const cssDamageLabel = css`
  font-size: 13px;
  color: #aaa;
  width: 60px;
`;

const cssDamageDisplay = css`
  width: 50px;
  height: 50px;
`;

const cssContent = css`
  flex: 1;
  display: flex;
  flex-direction: row;
  // background: rgba(255,255,255,.1);
`;

const cssSidebar = css`
  // background: #000;
  width: 30vw;
  padding: 20px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

class Index extends Component {
  constructor(props) {
    super(props);

    this.changeGear = this.changeGear.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.blackRollDice = this.blackRollDice.bind(this);

    this.state = {
      result: 0,
      engagedGear: 0,
      blackResult: 0,
      damage: 18,
      log: [],
      currentGear: 0
    }
  }

  changeGear(gear) {
    return () => {
      this.setState({
        result: 0,
        engagedGear: gear
      });
    }
  }

  rollDice(sides, colour, gear) {
    return () => {
      const result = sides[Math.floor(Math.random() * sides.length)];
      const { log } = this.state;

      this.setState({
        result,
        log: [{ result, colour, gear }].concat(log),
        currentGear: gear
      })
    }
  }

  blackRollDice(sides) {
    return () => {
      this.setState({
        blackResult: sides[Math.floor(Math.random() * sides.length)]
      });
    }
  }

  render() {
    const { result, blackResult, engagedGear, damage, log, currentGear } = this.state;

    const renderDice = dice
      .map(die => {
        const { gear, type, colour, description } = die;
        const disableGear = currentGear + 1 < gear || gear + 3 < currentGear;
        const neutral = engagedGear === 0;
        const enableGear2 = engagedGear === 0 && gear === 2;

        const cssGear = css`
          transform: translate(${engagedGear === gear ? "5vw" : "0"});
          transition: transform .1s ease-in-out;
          flex: 1;

          button {
            height: 100%;
            width: 25vw;
            border: none;
            padding: 0;
            background-color: ${colour};
            opacity: ${(disableGear || neutral) ? 0.5 : 1};
            ${(disableGear || neutral) && "filter: grayscale(1);"}
            ${disableGear && "pointer-events: none;"}
            ${enableGear2 && "pointer-events: auto;"}
            color: ${gear === 1 && !disableGear ? "#000" : "#fff"};
          }
        `;

        const cssGearNo = css`
          font-size: 19px;
          font-weight: bold;
          // border-radius: 50%;
          // width: 30px;
          // margin: 0 auto;
          padding: 2px 0;
          // ${(log.length > 0 && log[0].gear === gear) && `border: 1px solid white;`}
          // border-color: ${gear === 1 && !disableGear ? "#000" : "#fff"};
        `;

        const cssGearOdds = css`
          opacity: 0.8;
        `;

        let numberEnding = "th";
        if (gear === 1) {
          numberEnding = "st"
        }
        if (gear === 2) {
          numberEnding = "nd"
        }
        if (gear === 3) {
          numberEnding = "rd"
        }

        return (
          <li css={cssGear} key={`Gear ${gear}`}>
            <button onClick={this.changeGear(gear)} key={type}>
              <div css={cssGearNo}>{gear}{numberEnding}</div>
              <div css={cssGearOdds}>{description}</div>
            </button>
          </li>
        );
      })
      .splice(0, dice.length - 1);

    const cssMain = css`
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      
      background-color: ${engagedGear > 0 ? dice[engagedGear - 1].colour : "transparent"};
      color: ${engagedGear === 1 ? "#000" : "#fff"};
    `;

    const cssStartScreen = css`
      font-size: 20px;
      
      div:last-child {
        font-size: 14px;
        color: #888;

        span {
          display: inline-block;
          width: 40px;
          color: #fff;
        }
      }
    `;

    const cssDiceScreen = css`
      font-size: 20px;
      text-align: center;

      button {
        border: none;
        // background-color: rgba(255,255,255,.2);
        background: transparent;
        width: 140px;
        height: 140px;
        // border-radius: 50%;
        font-size: 100px;
        margin: 50px 0;
        color: ${engagedGear === 1 ? "#000" : "#fff"};
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-weight: bold;
          font-size: 40px;
        }
      }
    `;

    const blackDie = dice[dice.length - 1];

    const cssBlackDie = css`
      width: 25vw;
      height: 70px;
      background: black;
      border: none;
      color: white;
      font-size: 18px;
    `;

    const renderLog = log.map((x, i) => (
      <span css={css`color: ${x.colour}; margin-right: 5px;`} key={`key${i}`}>{x.result}</span>
    ));

    const averageSpeed = (log.reduce((acc, a) => acc + a.result, 0) / log.length).toFixed(1);

    const startScreen = (
      <div css={cssStartScreen}>
        <div>Neutral</div>
        <div>
          Roll Black dice<br />
          <span>1</span>Miss first turn<br />
          <span>2 - 19</span>Engage 1st Gear<br />
          <span>20</span>Move 4 spaces <br />
          <span>{" "}</span>(change to 2nd next go)
        </div>
      </div>
    );

    const diceScreen = engagedGear > 0 && (
      <div css={cssDiceScreen}>
        <div>
          <button onClick={
            this.rollDice(dice[engagedGear - 1].sides, dice[engagedGear - 1].colour, dice[engagedGear - 1].gear)
          }>
            {result === 0 ? <span>GO</span> : result}
          </button>
          <div>
            &nbsp;
            {currentGear === engagedGear + 2 && "1 damage"}
            {currentGear === engagedGear + 3 && "2 damage"}
            &nbsp;
          </div>
        </div>
      </div>
    );

    return (
      <div css={cssIndex}>
        <Global styles={cssGlobalStyles} />
        <header css={cssHeader}>
          <h1>FORMULA D</h1>
          <div><em>Av. speed: </em>{isNaN(averageSpeed) ? "0" : averageSpeed}&nbsp;&nbsp;&nbsp;&nbsp;<em>Current gear: </em>{currentGear === 0 ? "N" : currentGear}</div>
          <div><em>Log: </em>{renderLog}</div>
        </header>
        <section css={cssContent}>
          <ul css={cssSidebar}>{renderDice}</ul>
          <div css={cssMain}>
            <div>
              {engagedGear === 0 ? startScreen : diceScreen}
            </div>
          </div>
        </section>
        <footer css={cssFooter}>
          <button onClick={this.blackRollDice(blackDie.sides)} css={cssBlackDie}>
            {blackResult}
          </button>
          <div css={cssDamage}>
            <div css={cssDamageLabel}>DAMAGE:</div>
            <button onClick={() => this.setState({ damage: damage - 1})}>-</button>
            <div css={cssDamageNumber}>{damage}</div>
            <button onClick={() => this.setState({ damage: damage + 1})}>+</button>
            <div css={cssDamageDisplay} />
          </div>
        </footer>
      </div>
    );
  }
}

export default Index;