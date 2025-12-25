import React from 'react'

const Blueprint = (props)=>{
    return (
        <div className='bluer'>
            {props.text}
            <i class="ri-arrow-right-up-fill"></i>
        </div>
    )
}

const HeroSection = () => {
    return (
        <div className='hero'>
            <div>
                <h1>Unleash Your Inner Champion Today</h1>
                <h1>All In One Place</h1>
            </div>
            <div>
                <h4>Join the ultimate tennis experience -  where passion meets performance</h4>
                <h4>and every swing brings you closer to victory</h4>
            </div>
            <div className="btn">
                Start your own journey
            </div>
            <div className="bottom">
                <div className='left'>
                    <h5>Train with real professionals Get the real results.</h5>
                    <div className="imager">
                        <img src="https://imgs.search.brave.com/q-3swkcvbHG3PrsdhOdcQTwwF17i5FOzLQ4YJBBaIxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTg1/MTM4Njc0L3Bob3Rv/L3BvcnRyYWl0LW9m/LXNtaWxpbmctbWlk/LWFkdWx0LW1hbi13/ZWFyaW5nLXQtc2hp/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUVyRnJQdDcz/d2owX0M0MTczZXc2/em82SW4wRXpFOGZN/NUNBQXF6YnRzbEU9" alt="" />
                        <img src="https://imgs.search.brave.com/q-3swkcvbHG3PrsdhOdcQTwwF17i5FOzLQ4YJBBaIxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTg1/MTM4Njc0L3Bob3Rv/L3BvcnRyYWl0LW9m/LXNtaWxpbmctbWlk/LWFkdWx0LW1hbi13/ZWFyaW5nLXQtc2hp/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUVyRnJQdDcz/d2owX0M0MTczZXc2/em82SW4wRXpFOGZN/NUNBQXF6YnRzbEU9" alt="" />
                        <img src="https://imgs.search.brave.com/q-3swkcvbHG3PrsdhOdcQTwwF17i5FOzLQ4YJBBaIxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTg1/MTM4Njc0L3Bob3Rv/L3BvcnRyYWl0LW9m/LXNtaWxpbmctbWlk/LWFkdWx0LW1hbi13/ZWFyaW5nLXQtc2hp/cnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUVyRnJQdDcz/d2owX0M0MTczZXc2/em82SW4wRXpFOGZN/NUNBQXF6YnRzbEU9" alt="" />
                    </div>
                </div>
                <div className="right">
                    <Blueprint text='Instagram'/>
                    <Blueprint text='Facebook'/>
                    <Blueprint text='Tik Tok'/>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
