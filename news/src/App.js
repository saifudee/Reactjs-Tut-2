import './App.css';
// import React, {Component} from 'react';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App =()=>{
  const pageSize = 5;
  const[progress,setProgress] = useState(0);
  // state = {
  //   progress:0
  // }
  // setProgress = (progress)=>{
  //   setState({progress: progress})
  // }
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          // progress={state.progress} 
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="General" pageSize={pageSize} country="in" category="General" />}></Route>
          <Route exact path="/Business" element={<News setProgress={setProgress} key="Business" pageSize={pageSize} country="in" category="Business" />}></Route>
          <Route exact path="/Sports" element={<News setProgress={setProgress} key="Sports" pageSize={pageSize} country="in" category="Sports" />}></Route>
          <Route exact path="/Entertainment" element={<News setProgress={setProgress} key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" />}></Route>
          <Route exact path="/Technology" element={<News setProgress={setProgress} key="Technology" pageSize={pageSize} country="in" category="Technology" />}></Route>
          <Route exact path="/Science" element={<News setProgress={setProgress} key="Science" pageSize={pageSize} country="in" category="Science" />}></Route>
          <Route exact path="/General" element={<News setProgress={setProgress} key="General" pageSize={pageSize} country="in" category="General" />}>
          </Route>
          <Route exact path="/Health" element={<News setProgress={setProgress} key="Health" pageSize={pageSize} country="in" category="Health" />}>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;

