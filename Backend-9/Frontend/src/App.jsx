import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const App = () => {
  const [notes, setNotes] = useState([])

  function getNotes(){
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes);
      })
  }

  useEffect(() => {
    getNotes()
  }, [])
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            MY NOTES
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-pink-500"></div>
            <div className="w-2 h-2 bg-pink-500 rotate-45"></div>
            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-pink-500"></div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {notes.map((note, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-500"></div>

              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-pink-500/30 rounded-2xl p-8 hover:border-pink-500/60 transition-all duration-300">

                <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-pink-500/50"></div>
                <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-pink-500/50"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-pink-500/50"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-pink-500/50"></div>

                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <h2 className="text-2xl font-bold mb-4 text-pink-400 group-hover:text-pink-300 transition-colors duration-300">
                  {note.title}
                </h2>

                <p className="text-gray-300 leading-relaxed text-lg">
                  {note.description}
                </p>

                <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center items-center gap-4">
          <div className="w-2 h-2 bg-pink-500 rotate-45 animate-pulse"></div>
          <div className="w-2 h-2 bg-pink-500 rotate-45 animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-pink-500 rotate-45 animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  )
}

export default App