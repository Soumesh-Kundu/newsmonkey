import React, { useState, useLayoutEffect, useRef } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { gsap } from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
  

export default function App() {
  const apikey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const app = useRef()
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  useLayoutEffect(() => {
    let smoother = ScrollSmoother.create({
      effects: true,
      smooth: 1
    })
    return () => {
      smoother.kill()
    }
  }, [])
  return (
    <>
      <div className='app' ref={app}>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <Routes>
                <Route exact path="/business" element={<News key='business' country="in" category='business' setProgress={setProgress} apikey={apikey} />} />
                <Route exact path="/sports" element={<News key='sports' country="in" category='sports' setProgress={setProgress} apikey={apikey} />} />
                <Route exact path="/technology" element={<News key='technology' country="in" category='technology' setProgress={setProgress} apikey={apikey} />} />
                <Route exact path="/health" element={<News key='health' country="in" category='health' setProgress={setProgress} apikey={apikey} />} />
                <Route exact path="/science" element={<News key='science' country="in" category='science' setProgress={setProgress} apikey={apikey} />} />
                <Route exact path="/" element={<News key='general' country="in" category='general' setProgress={setProgress} apikey={apikey} />} />
                <Route exact path="/entertainment" element={<News key='entertainment' country="in" category='entertainment' setProgress={setProgress} apikey={apikey} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  )
}


