import { useState } from "react";
import Main from "./Main";
import buttons from "./button";

function App() {
  var [btn,setBtn]=useState(buttons)
  console.log(btn);
  return (
    <div className="con">
<Main button={btn} setbutton={setBtn}/>
    </div>
  );
}

export default App;
