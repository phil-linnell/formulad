import React, { useState } from "react";
import { css } from "@emotion/core";
import dice from "../content/dice";
import "normalize.css";

const cssHeader = css`
  display: flex;
  flex-direction: row;
  height: 80px;
  background: rgba(0,0,0,.1);
`;

const cssContent = css`
  display: flex;
  flex-direction: row;
  background: rgba(0,0,0,.1);
`;

const cssSidebar = css`
  background: rgba(0,0,0,.3);
  min-width: 80px;
  width: 20%;
  padding: 20px;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
`;

const cssMain = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  background: rgba(0,0,0,.5);
`;

const Index = () => {
  const [result, rollDice] = useState(0);
  const [currentGear, changeGear] = useState(1);
  const [damage, handleDamage] = useState(18);

  const renderDice = dice.map(die => {
    const { gear, type, sides, description } = die;
    const isDamageDice = gear === "damage";
    const name = !isDamageDice ? `Gear ${gear}` : "Damage";

    const handleRollDice = () => {
      if (!isDamageDice) {
        changeGear(gear);
      }
      return rollDice(sides[Math.floor(Math.random() * sides.length)]);
    }

    const cssGear = css`
      ${currentGear === gear && "margin-left: 30px;"}
    `;

    return (
      <li css={cssGear}>
        <button onClick={handleRollDice} key={type}>
          <div>{name}</div>
          <div>{description}</div>
        </button>
      </li>
    );
  });

  return (
    <div>
      <header css={cssHeader}>
        <button onClick={() => handleDamage(damage - 1)}>-</button>
        <div>{damage}</div>
        <button onClick={() => handleDamage(damage + 1)}>+</button>
      </header>
      <section css={cssContent}>
        <div css={cssSidebar}>
          <ul>{renderDice}</ul>
        </div>
        <div css={cssMain}>
          <p>{result}</p>
        </div>
      </section>
    </div>
  );
}

export default Index;