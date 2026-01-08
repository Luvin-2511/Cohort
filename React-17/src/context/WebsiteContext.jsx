import React, { createContext, useState } from 'react'
export const webContext = createContext()
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.webp'
import bg5 from '../assets/bg5.webp'
import bg6 from '../assets/bg6.jpg'
import pro1 from '../assets/1.avif'
import pro5 from '../assets/5.avif'
import pro2 from '../assets/2.jpg'
import pro3 from '../assets/3.jpg'
import pro4 from '../assets/4.jpg'
import pro6 from '../assets/6.webp'


const WebsiteContext = (props) => {
    const footercontent = "© 2026 YourCompanyName. Designed & developed in India."
    const [title, setTitle] = useState('React')

    const titleChanger = (title) => {
        setTitle(title)
    }

    const arr = [
        {
            bgImage: bg1,
            profile: pro1,
            name: 'Noah Thompson',
            desc: 'Product Designer who focuses on simplicity & usability',
            likes: '72.9k',
            posts: '828',
            views: '349.9k'
        },
        {
            bgImage: bg2,
            profile: pro2,
            name: 'Olivia Martinez',
            desc: 'UI/UX Designer with a passion for clean interfaces',
            likes: '58.2k',
            posts: '512',
            views: '210.4k'
        },
        {
            bgImage: bg3,
            profile: pro3,
            name: 'Ethan Walker',
            desc: 'Frontend Developer turning ideas into reality',
            likes: '91.4k',
            posts: '1,024',
            views: '489.1k'
        },
        {
            bgImage: bg4,
            profile: pro4,
            name: 'Sophia Lee',
            desc: 'Creative director & visual storyteller',
            likes: '66.7k',
            posts: '640',
            views: '301.8k'
        },
        {
            bgImage: bg5,
            profile: pro5,
            name: 'Liam Johnson',
            desc: 'Full-stack developer and tech enthusiast',
            likes: '84.3k',
            posts: '910',
            views: '402.6k'
        },
        {
            bgImage: bg6,
            profile: pro6,
            name: 'Ava Brown',
            desc: 'Content creator focused on branding & growth',
            likes: '49.8k',
            posts: '376',
            views: '189.2k'
        }
    ];

    return (
        <webContext.Provider value={{ footer: footercontent, title: title, titleChanger: titleChanger,arr:arr }}>
            {props.children}
        </webContext.Provider>
    )
}

export default WebsiteContext
