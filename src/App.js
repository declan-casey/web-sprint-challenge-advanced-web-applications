import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"
import BubblePage from "./components/BubblePage"
import {axiosWithAuth} from "./helpers/axiosWithAuth"
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([])

  const getColors = () => {
    axiosWithAuth()
      .get("/colors")
      .then( res => setColorList(res.data))
      .catch( err => console.log(err))
  }
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path= "/protected" getColors = {getColors} component = {BubblePage}/>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute