import React from 'react'
import Navbar from './Components/Navbar'
import Button from './Components/Button'

const App = () => {
  const user = 'SHERyians'
  return (
    <div className='w-[100vw]'>
      <div>
        {
          {
            sheryians: (
              <Navbar title="Sheryians" color="red"
                desc={['Home', 'Courses', 'Coder/Codex', 'Profile']} />
            ),

            pw: (
              <Navbar title="PW" color="green"
                desc={['Home', 'Class', 'Vidyapeeth', 'Profile']} />
            ),

            "apni kaksha": (
              <Navbar title="apni kaksha" color="blue"
                desc={['Home', 'Scams', 'Shraddha Di', 'Classes', 'Profile']} />
            ),

            unacademy: (
              <Navbar title="Unacademy" color="purple"
                desc={['Home', 'Courses', 'Live Classes', 'Test Series', 'Profile']} />
            ),

            coursera: (
              <Navbar title="Coursera" color="teal"
                desc={['Home', 'Degrees', 'Certificates', 'For Business', 'Profile']} />
            ),

            udemy: (
              <Navbar title="Udemy" color="black"
                desc={['Home', 'Categories', 'My Learning', 'Wishlist', 'Profile']} />
            ),

            "byju’s": (
              <Navbar title="Byju’s" color="orange"
                desc={['Home', 'Classes', 'Scholarships', 'Mentors', 'Profile']} />
            ),

            scaler: (
              <Navbar title="Scaler" color="indigo"
                desc={['Home', 'Programs', 'Mentorship', 'Placements', 'Profile']} />
            ),

            "coding ninjas": (
              <Navbar title="Coding Ninjas" color="red"
                desc={['Home', 'Courses', 'Practice', 'Events', 'Profile']} />
            ),

            geekforgeeks: (
              <Navbar title="GeekforGeeks" color="green"
                desc={['Home', 'DSA', 'Web Dev', 'Practice', 'Profile']} />
            ),

            "khan academy": (
              <Navbar title="Khan Academy" color="cyan"
                desc={['Home', 'Subjects', 'Practice', 'Dashboard', 'Profile']} />
            )
          }
          [user.toLowerCase()] || <></>
        }

      </div>
      <Button text='Download'/>
    </div>
  )
}

export default App
