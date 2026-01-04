import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Courses from "./pages/Courses"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Kodr from "./pages/Kodr";
import Codex from "./pages/Codex";
import AllCourses from "./pages/AllCourses";
import Footer from "./components/Footer";




const App = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/courses' element={<AllCourses />}>
          <Route path='/courses' element={<Courses />}/>
          <Route path='/courses/kodr' element={<Kodr />}/>
          <Route path='/courses/codex' element={<Codex />}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
