import React from 'react'
import Navbut from './Navbut'
import Sidetemp from './Sidetemp'
import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'

const Sampler = (props) => {
    return (
        <div className="sampler">
            <h1>{props.main}</h1>
            <h5>{props.side}</h5>
        </div>
    )
}

const Second = () => {
    return (
        <div className='second'>
            <div className="top">
                <Navbut text='About Horizon' />
                <h2>At Horizon, we don't just play tennis — we live it. Since 2021, our club has been a home for players of all levels, from eager beginners to seasoned pros.</h2>
            </div>
            <div className="middle">
                <Sidetemp link={img1} />
                <Sidetemp link={img2} />
                <Sidetemp link={img3} />
            </div>
            <h3>A few more facts about us in numbers</h3>
            <div className="flexer">
                <Sampler main='12 000+' side='Hours of play anually' />
                <Sampler main='89%' side='Player Retention Rate' />
                <Sampler main='1,200+' side='Active Members' />
                <Sampler main='125+' side='Annual Tournaments' />
            </div>
        </div>
    )
}

export default Second
