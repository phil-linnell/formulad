import React, { useState } from "react";
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
  height: 80px;
  display: flex;
  align-items: center;
  // background: rgba(255,255,255,.1);
  margin-bottom: 5px;

  h1 {
    font-size: 18px;
    font-weight: normal;
    margin: 0;
    padding: 0;
    margin-left: 20px;
  }
`;

const cssFooter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  line-height: 30px;
  // background: rgba(255,255,255,.1);
  margin-top: 5px;
`;

const cssDamage = css`
  display: flex;
  flex-direction: row;
  margin-left: auto;
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

const cssDamageDisplay = css`
  text-align: center;
  width: 40px;
`;

const cssDamageLabel = css`
  font-size: 14px;
  color: #aaa;
  margin-right: 10px;
  width: 60px;
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

const Index = () => {
  const [result, rollDice] = useState(0);
  const [currentGear, changeGear] = useState(0);
  const [damage, handleDamage] = useState(18);
  const [blackResult, blackRollDice] = useState(0);

  const renderDice = dice
    .map(die => {
      const { gear, type, sides, description } = die;
      const name = `Gear ${gear}`;
      const disableGear = currentGear + 1 < gear || gear + 3 < currentGear;
      const neutral = currentGear === 0;
      const enableGear2 = currentGear === 0 && gear === 2;

      const handleRollDice = () => {
        changeGear(gear);
        return rollDice(sides[Math.floor(Math.random() * sides.length)]);
      }

      const cssGear = css`
        ${currentGear === gear && "margin-left: 5vw;"}
        flex: 1;

        button {
          height: 100%;
          width: 25vw;
          border: none;
          padding: 0;
          background-color: ${die.colour};
          opacity: ${(disableGear || neutral) ? 0.5 : 1};
          ${(disableGear || neutral) && "filter: grayscale(1);"}
          ${disableGear && "pointer-events: none;"}
          ${enableGear2 && "pointer-events: auto;"}
        }
      `;

      return (
        <li css={cssGear} key={name}>
          <button onClick={handleRollDice} key={type}>
            <div>{name}</div>
            <div>{description}</div>
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
    font-size: 100px;
    background-color: ${currentGear > 0 ? dice[currentGear - 1].colour : "transparent"};

    div {
      // text-align: center;
      font-size: 20px;
    }
    div > div:last-child {
      font-size: 14px;
      color: #666;

      span {
        display: inline-block;
        color: white;
        width: 40px;
      }
    }
  `;

  console.log(currentGear);

  const blackDie = dice[dice.length - 1];

  const cssBlackDie = css`
    width: 25vw;
    height: 80px;
    background: black;
    border: none;
    color: white;
    font-size: 18px;
  `;

  const handleBlackRollDice = () => {
    return blackRollDice(blackDie.sides[Math.floor(Math.random() * blackDie.sides.length)]);
  }

  return (
    <div css={cssIndex}>
      <Global styles={cssGlobalStyles} />
      <header css={cssHeader}>
        <h1>FORMULA D DICE</h1>
      </header>
      <section css={cssContent}>
        <ul css={cssSidebar}>{renderDice}</ul>
        <div css={cssMain}>
          <p>
            {result === 0 ? (
              <div>
                <div>Neutral</div>
                <div>
                  Roll Black dice<br />
                  <span>1</span>Miss first turn<br />
                  <span>2 - 19</span>Engage 1st Gear<br />
                  <span>20</span>Move 4 spaces <br />
                  <span>{" "}</span>(change to 2nd next go)
                </div>
              </div>
            ) : result}
          </p>
        </div>
      </section>
      <footer css={cssFooter}>
        <button onClick={handleBlackRollDice} css={cssBlackDie}>
          {blackResult}
        </button>
        
        <div css={cssDamage}>
          <div css={cssDamageLabel}>DAMAGE:</div>
          <button onClick={() => handleDamage(damage - 1)}>-</button>
          <div css={cssDamageDisplay}>{damage}</div>
          <button onClick={() => handleDamage(damage + 1)}>+</button>
        </div>
      </footer>
    </div>
  );
}

export default Index;