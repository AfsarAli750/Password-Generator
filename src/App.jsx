import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [range, setRange] = useState(8);
  const [isCapital, setIsCapital] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isSpecial , setIsSpecial] = useState(false);
  const [isCopy , setIsCopy] = useState(false);

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialCharacter = "`~!@#$%^&*()_[]{}?";
  const buttonClicked = () => {
    navigator.clipboard.writeText(password);
    const flag = true;
    setIsCopy(flag);
    alert(`Password is copied : ${password}`);
  };

  useEffect(() => {
    generatePassword();
  }, [range, isCapital, isSmall , isSpecial]);

  const generatePassword = () => {
    let charset = digits; // always include numbers
    if (isCapital) charset += upper;
    if (isSmall) charset += lower;
    if(isSpecial) charset += specialCharacter;
    setIsCopy(false);

    let pass = "";
    for (let i = 0; i < range; i++) {
      let ran = Math.floor(Math.random() * charset.length);
      pass += charset[ran];
    }
    setPassword(pass);
  };

  return (
    <div id="container">
      <h1>Password Generator</h1>
      <div id="showContent">
        <input type="text" readOnly id="password-show" value={password} />
        <button onClick={isCopy ? null: buttonClicked}>{isCopy ? "Copied" : "Copy"}</button>
      </div>

      <div id="range-box">
        <label htmlFor="range" >Length : {range}</label>
        <input
          id="range"
          type="range"
          max="20"
          min="4"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        />
      </div>

      <div id="capital-box">
        <label htmlFor="Capital">Capital Alphabet</label>
        <input
          type="checkbox"
          id="Capital"
          onChange={(e) => setIsCapital(e.target.checked)}
        />
      </div>

      <div id="small-box">
        <label htmlFor="Small">Small Alphabet</label>
        <input
          type="checkbox"
          id="Small"
          onChange={(e) => setIsSmall(e.target.checked)}
        />
      </div>

      <div id="special-box">
        <label htmlFor="special-character">Special character</label>
        <input 
        type="checkbox"
        id="special-character"
        onChange={(e)=> setIsSpecial(e.target.checked)} />
      </div>
    </div>
  );
};

export default App;
