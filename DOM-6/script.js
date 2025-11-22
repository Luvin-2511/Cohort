let main = document.querySelector('.wrapper')
let content = ''

let arr = [
    {
        'name': 'sheryians_coding_school',
        'likes': '10,286,790',
        'comments': "Congrats Messi, We’ve trained. We’re ready. But we can’t do it alone we need you. We’ll be there giving it everything we’ve got.Fighting for the badge, for the team, for every one of you.Will you be there with us all the way? Let’s make it unforgettable. 💪🔥",
        'comnum': '20,898',
        'time': '7d',
        'profile': 'https://imgs.search.brave.com/CDDIuhYnTo3Xp4nTgWy6xKxEeQcQ2WHhVTEW15f730k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZE5fSlBYME52/L3cvNDAwL2gvNDAw/L3RoZW1lL2Rhcmsv/aWNvbi5qcGVnP2M9/MWJ4aWQ2NE11cDdh/Y3pld1NBWU1YJnQ9/MTc1NzY5NDUyMDI5/Ng',
        'post': 'https://scontent.cdninstagram.com/v/t51.82787-15/575423137_18339107389225804_7426829008575633234_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzc2MjYwMzIzMTc1NjM3NDcxNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=cgDjTeNwgIsQ7kNvwFkiZuz&_nc_oc=AdnkeNsQP41bKBqBe5rNfjqLHSaST-TyIk1efKd2dAksCMLR9g1KGOgq2tWEAwqnrgA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=xfsfdxYZLd34mgb2krW04w&oh=00_Afg8t0b-l6J-c1f9X2lBPy5YglDW6mA3FtKk_fG6zXNLIw&oe=69263CC6',
    },
    {
        'name': 'cristiano',
        'likes': '3,286,790',
        'comments': "Congrats Messi, We’ve trained. We’re ready. But we can’t do it alone we need you. We’ll be there giving it everything we’ve got.Fighting for the badge, for the team, for every one of you.Will you be there with us all the way? Let’s make it unforgettable. 💪🔥",
        'comnum': '20,898',
        'time': '1d',
        'profile': 'https://imgs.search.brave.com/qBwE7sn7wgpHK6BO3-MqviePTpFQpP7ZZ_fjSKcAfDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VhLzBi/L2Q3L2VhMGJkNzk1/YTYzN2YwZTMzNzAz/MTI2ODRmN2MxNjVh/LmpwZw',
        'post': 'https://imgs.search.brave.com/L2YWFmNnaTmrQ5mTGWAZYgI0qwerWdz9Okdr6-dHSVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvODY2/NTc0My5qcGc',
    },
    {
        'name': 'leomessi',
        'likes': '7,045,569',
        'comments': "STAMOS NO MUNDIAL! VAMOS COM TUDO, PORTUGAL! 🇵🇹",
        'comnum': '10,465',
        'time': '5d',
        'profile': 'https://imgs.search.brave.com/L2YWFmNnaTmrQ5mTGWAZYgI0qwerWdz9Okdr6-dHSVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvODY2/NTc0My5qcGc',
        'post': 'https://scontent.cdninstagram.com/v/t51.82787-15/583786735_18661431481056421_5218505145743822975_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=1&ig_cache_key=Mzc2NzI0MDQyNzEyMDk0NDY3NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExMTV4MTM5My5zZHIuQzMifQ%3D%3D&_nc_ohc=afwAKBaJmAgQ7kNvwErEoqY&_nc_oc=Adl9mSvxiHgR4j8y0LYuGxu3u0wD_GOoHIm8xGw5fP2V99Oj3E2yBkIdzW29fgP4NIQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=c7wFOq3kfCePbWS8Hn0zrg&oh=00_Afigj1LKaLoYt2HMhB_1vhs77XXCukIzRU--uUnysg3fEA&oe=692646AB',
    },
]


arr.forEach(item => {
    content += `<div class='flex items-center bg-black justify-center h-full w-full'>
            <div class="cont border-b-[1px] border-gray-800 pb-[0.9vw] mb-[0.9vw]">
                <div class="header h-[3.5vw] w-[27vw] flex items-center justify-between ">
                    <div class='flex items-center gap-[0.7vw] cursor-pointer'>
                        <div class="sampimg  h-[2.7vw] w-[2.7vw] p-[2px] flex justify-center items-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] via-[#962fbf] to-[#4f5bd5] overflow-hidden cursor-pointer" >
                            <div class="rounded-full relative bg-black h-[2.5vw] p-[3px] w-[2.5vw] overflow-hidden flex justify-center items-center">
                                <img class='object-cover h-[2.2vw] w-[2.2vw] rounded-full' src="${item.profile}" alt="" />
                            </div>
                        </div>
                        <div class="name text-white font-semibold text-[0.9vw] flex items-center gap-1">
                            ${item.name}
                            <svg aria-label="Verified" class="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                            <div class="time text-gray-500">
                                •
                                ${item.time}
                            </div>
                        </div>
                    </div>
                    <div class="option cursor-pointer">
                        <svg aria-label="More options" class="x1lliihq x1n2onr6 x5n08af" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                </div>
                <div class="image relative clicker w-[27vw] cursor-pointer  overflow-hidden rounded-sm mt-[0.5vw] border-1 border-gray-800">
                    <img class='h-full w-full object-cover' src="${item.post}" alt="" />
                    <div style="rotate: 0deg;" class="liker absolute top-[50%] left-[50%] -translate-x-[50%] transition-all duration-500 -translate-y-[50%] z-10 ">
                        <i class="ri-heart-fill like transition-all duration-500 opacity-0.5  text-transparent bg-clip-text text-[0rem] bg-center bg-cover bg-[url(https://imgs.search.brave.com/lApH2FguirTL1_iN_DCxMJqeKkCmZaTjRWiErsPMeN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/NjAzMTI4Mi92ZWN0/b3Ivc21vb3RoLWNv/bG9yLWdyYWRpZW50/LWJhY2tncm91bmQt/dmVjdG9yLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1sZ0hG/b01RYVJhbWZaVEhh/ZnZWRXpwa3Z3bFRJ/RGFzOVpaUGNyWVJ5/RlNjPQ)]"></i>
                    </div>
                </div>
                <div class="desc">
                    <div class="likewaladabba mt-[0.7vw] flex items-center justify-between">
                        <div class="left flex items-center gap-4">
                            <i class="ri-heart-fill filled transition-all relative z-10 opacity-0 duration-500 text-transparent bg-clip-text text-[1.8rem] leading-none bg-center bg-cover bg-[url(https://imgs.search.brave.com/lApH2FguirTL1_iN_DCxMJqeKkCmZaTjRWiErsPMeN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM0/NjAzMTI4Mi92ZWN0/b3Ivc21vb3RoLWNv/bG9yLWdyYWRpZW50/LWJhY2tncm91bmQt/dmVjdG9yLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1sZ0hG/b01RYVJhbWZaVEhh/ZnZWRXpwa3Z3bFRJ/RGFzOVpaUGNyWVJ5/RlNjPQ)]"></i>
                            <svg aria-label="Like" class='likbut absolute opacity-100 cursor-pointer  hover:fill-gray-400 transition-all duration-500' fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                            <svg aria-label="Comment" class='cursor-pointer hover:fill-gray-400 hover:stroke-gray-400' fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="white" stroke-linejoin="round" stroke-width="2"></path></svg>
                            <svg aria-label="Share" class='cursor-pointer hover:fill-gray-400 hover:stroke-gray-400' fill="white" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share</title><path class='cursor-pointer  hover:stroke-gray-400' d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="white" stroke-linejoin="round" stroke-width="2"></path><line class='cursor-pointer  hover:stroke-gray-400' fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
                        </div>
                        <div class="right  flex items-center">
                            <svg aria-label="Save" class='cursor-pointer hover:stroke-gray-400' fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                        </div>
                    </div>
                    <div class="likecount text-white mt-[0.7vw] text-[0.85vw] font-semibold">
                        ${item.likes} likes
                    </div>
                    <div class="caption w-[27vw] mt-[0.5vw] text-white text-[0.85vw]  font-medium line-clamp-2">
                        <div class="name text-white font-semibold text-[0.9vw] flex items-center gap-1">
                            cristiano
                            <svg aria-label="Verified" fill="rgb(0, 149, 246)" height="12" role="img" viewBox="0 0 40 40" width="12"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                            <div class="time text-gray-500"></div>
                        </div>
                        ${item.comments}
                    </div>
                    <div class="comments text-gray-400 text-[0.85vw] mt-[0.5vw]" >
                        View all ${item.comnum} comments
                    </div>
                    <div class="ender flex items-center justify-between">
                        <input class='text-white placeholder:text-gray-400 text-[0.85vw] mt-[0.5vw] border-none focus:outline-none' type="text" name="" id="" placeholder='Add a comment...' />
                        <svg aria-label="Emoji" class='cursor-pointer hover:fill-gray-400' fill="white" height="13" role="img" viewBox="0 0 24 24" width="13"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                    </div>
                </div>
            </div>
        </div>`
})

console.log(content)


main.innerHTML = content