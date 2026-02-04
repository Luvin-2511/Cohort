import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [updater, setupdater] = useState(null);

  function getNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    getNotes();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        getNotes();
        title.value = "";
        description.value = "";
      });
  };

  const handledelete = (id) => {
    axios.delete(`http://localhost:3000/api/notes/${id}`).then((res) => {
      console.log(res.data);
      getNotes();
    });
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    const newDesc = e.target.newDesc.value;

    axios
      .patch(`http://localhost:3000/api/notes/${id}`, { description: newDesc })
      .then((res) => {
        console.log(res.data);
        getNotes();
        setupdater(null);
        e.target.newDesc.value = "";
      });
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Form Section */}
        <div className="mb-12">
          <form onSubmit={handleForm} className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>

            <div className="relative bg-linear-to-br from-gray-900 to-black border border-pink-500/30 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    required
                    className="w-full px-6 py-4 text-lg bg-black/50 border-2 border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    placeholder="Enter title"
                    type="text"
                    name="title"
                  />
                </div>

                <div className="flex-1">
                  <input
                    required
                    className="w-full px-6 py-4 text-lg bg-black/50 border-2 border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    placeholder="Enter description"
                    type="text"
                    name="description"
                  />
                </div>

                <button className="px-8 py-4 bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50">
                  Add Note
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-pink-500 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            MY NOTES
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-pink-500"></div>
            <div className="w-2 h-2 bg-pink-500 rotate-45"></div>
            <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-pink-500"></div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {notes.map((note, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-500"></div>

              <div className="relative bg-linear-to-br from-gray-900 to-black border border-pink-500/30 rounded-2xl p-8 hover:border-pink-500/60 transition-all duration-300">
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
                <div className="flex items-center justify-start gap-5">
                  <button
                    onClick={() => {
                      handledelete(note._id);
                    }}
                    className="px-4 py-2 cursor-pointer mt-5 bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setupdater(note._id);
                    }}
                    className="px-4 py-2 cursor-pointer mt-5 bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50"
                  >
                    Update
                  </button>
                  <form
                    onSubmit={(e) => {
                      handleUpdate(note._id, e);
                    }}
                    className={` ${updater === note._id ? "flex" : "hidden"} mt-6 items-center justify-center gap-5`}
                  >
                    <input
                      name="newDesc"
                      id={note._id}
                      required
                      className={`w-full px-4 py-2 text-lg  bg-black/50 border-2 border-pink-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300`}
                      placeholder="Enter new description"
                      type="text"
                    />
                    <button className="px-4 py-2 cursor-pointer  bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50">
                      Enter
                    </button>
                  </form>
                </div>

                <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-pink-500/50 to-transparent"></div>
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
  );
};

export default App;
