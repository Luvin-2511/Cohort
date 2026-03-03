import React, {useRef, useState} from "react";
import Sidebar from "../components/SideBar.jsx";
import useAuth from "../../Auth/Hooks/useAuth.jsx";
import usePost from "../Hooks/usePost.jsx";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("prefer_not_to_say");
    const [genderOpen, setGenderOpen] = useState(false);
    const {user} = useAuth()
    const navigate = useNavigate()
    const photoUpdateRef = useRef();
    const {handleUpdateProfile, loading} = usePost()
    const genderOptions = [
        {value: "male", label: "Male"},
        {value: "female", label: "Female"},
        {value: "prefer_not_to_say", label: "Prefer not to say"},
    ];

    let [previewImage, setPreviewImage] = useState(null)

    const selectedGenderLabel = genderOptions.find(g => g.value === gender)?.label || "Prefer not to say";

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const image = photoUpdateRef.current.files[0];
        await handleUpdateProfile(image, bio)
        navigate('/profile')

    };


    return (
        <div className="min-h-screen bg-black text-white flex">
            {loading && <div
                className={`loadingLiner ${loading ? "animate-[Loading_0.7s_linear_forwards]" : ""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
                <Sidebar/>
            </div>}

                <Sidebar/>
            <div className="flex-1 ml-0 md:ml-[72px] lg:ml-[244px] flex flex-col items-center">
                <div className="w-full max-w-[660px] px-4 py-10">

                    {/* Title */}
                    <h1 className="text-2xl font-bold mb-8">Edit profile</h1>

                    {/* Avatar card */}
                    <div className="flex items-center justify-between bg-[#262626] rounded-2xl px-4 py-3 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-[#3a3a3a] overflow-hidden flex-shrink-0">
                                {
                                    previewImage ?
                                        <img src={previewImage} alt="profile"
                                             className="w-full h-full object-cover"/>
                                        :
                                        <img src={user.profileImg} alt="profile"
                                             className="w-full h-full object-cover"/>
                                }
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{user.username}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                        </div>
                        <label
                            className="bg-[#0095f6] cursor-pointer hover:bg-[#1aa3ff] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-xl"
                            htmlFor="photo">Change Photo</label>
                        <input ref={photoUpdateRef} onChange={handleChange} id="photo" name="photo" type="file" hidden/>
                    </div>

                    {/* Bio */}
                    <div className="mb-8">
                        <h2 className="text-base font-bold mb-3">Bio</h2>
                        <div className="relative bg-[#262626] rounded-xl overflow-hidden">
                            <textarea
                                value={bio}
                                onChange={(e) => {
                                    if (e.target.value.length <= 150) setBio(e.target.value)
                                }}
                                placeholder="Bio"
                                rows={4}
                                className="w-full bg-transparent text-white placeholder:text-gray-500 text-sm px-4 pt-3 pb-7 resize-none focus:outline-none"
                            />
                            <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                                {bio.length} / 150
                            </span>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-10">
                        <h2 className="text-base font-bold mb-3">Gender</h2>
                        <div className="relative">
                            <button
                                onClick={() => setGenderOpen(prev => !prev)}
                                className="w-full flex items-center justify-between bg-[#262626] hover:bg-[#2e2e2e] transition-colors text-white text-sm px-4 py-3 rounded-xl"
                            >
                                <span>{selectedGenderLabel}</span>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${genderOpen ? "rotate-180" : ""}`}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2"
                                >
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>

                            {genderOpen && (
                                <div
                                    className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#262626] border border-gray-700 rounded-xl overflow-hidden z-10 shadow-xl">
                                    {genderOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => {
                                                setGender(opt.value);
                                                setGenderOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#333] transition-colors ${gender === opt.value ? "text-white font-semibold" : "text-gray-300"}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">This won't be part of your public profile.</p>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#0095f6] hover:bg-[#1aa3ff] active:bg-[#0081d6] transition-colors text-white text-sm font-bold py-3 rounded-xl"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;