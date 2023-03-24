import { useState } from "react";

const Button = ({click, text}) => {

  return (
    <button onClick={click}>
      <p>{text}</p>
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const average = (((good * 1) + (0 * neutral) + (-1 * bad)) / total)
  console.log(average);
  const positive = (good/total)

  const churnValue = (value, setValue) => () => {
    setValue(value + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <p>Give feedack</p>
      <br/>

      <Button click={churnValue(good,setGood)} text="good"/>
      <Button click={churnValue(neutral,setNeutral)} text="neutral"/>
      <Button click={churnValue(bad,setBad)} text="bad"/>

      <br/>
      <p>Statistics</p>
      <br/>
      <p>good {good}</p>
      <br/>
      <p>neutral {neutral}</p>
      <br/>
      <p>bad {bad}</p>
      <br/>
      <p>total {total}</p>
      <br/>
      <p>average {average}</p>
      <br/>
      <p>positive {positive}%</p>

    </div>
  )
}

export default App
