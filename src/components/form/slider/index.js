import React, { useState, useEffect, useRef } from 'react'
import './index.less'
import px2num from '@/utils/px2num'

function Slider(props) {
    const [value, setValue] = useState();
    const slider = useRef()
    const bar = useRef()
    let lastX = null
    useEffect(() => {
        setValue(props.value)
        return () => {

        };
    }, [props.value]);
    useEffect(() => {
        setValue(props.value || 20)
        return () => {

        };
    }, []);
    return (
        <div ref={slider} onClick={(e) => handleClick(e)} className="slider">
            <div ref={bar} style={computeStyle(props)} className="bar">
                <div onTouchMove={e => handleTouchMove(e)}
                    onTouchEnd={() => handleTouchEnd()}
                    onClick={(e) => { e.stopPropagation() }}
                    className="button-wrapper">
                    <div className="button"></div>
                </div>
            </div>
        </div>
    )
    function handleTouchEnd() {
        lastX = null
        bar.current.style.transition = ''
    }
    function handleTouchMove(e) {
        e.persist()
        let x = e.touches[0].clientX
        if (!lastX) {
            lastX = x
        } else {
            const width = getSliderWidth()
            const del = (x - lastX) / width * 100
            bar.current.style.transition = 'none 0s'
            setValue(value + del >= 100 ? 100 : value + del)
        }
    }
    function getSliderWidth() {
        return px2num(window.getComputedStyle(slider.current).width)
    }
    function handleClick(e) {
        const x = e.nativeEvent.offsetX
        const width = getSliderWidth()
        let value = x / width * 100
        if (value >= 100) value = 100
        setValue(value)
    }
    function computeStyle() {

        let style = {}
        style.width = `${value}%`

        return style
    }
}

export default React.memo(Slider)