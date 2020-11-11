import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faAngleLeft, faAngleRight, faDrumSteelpan } from "@fortawesome/free-solid-svg-icons"

const Player = (props) => {

    
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const playSongHandler = () => {
        props.setIsPlaying(!props.isPlaying)
        if (props.isPlaying) {
            props.audioRef.current.pause()
        } else {
            props.audioRef.current.play()
        }
    }

    const timeLoadHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        setSongInfo({...songInfo, currentTime: current, duration})
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        setSongInfo({...songInfo, currentTime: current})
    }

    const dragHandler = (e) => {
        props.audioRef.current.currentTime = e.target.value
        setSongInfo({ 
            ...songInfo, 
            currentTime: e.target.value 
        })
    }

    const timeEndHandler = (e) => {
        props.setIsPlaying(false)
        console.log(props.audioRef.current.currentTime)
        setSongInfo({...songInfo, currentTime: 0})
        // console.log(props.audioRef.current.ended)
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration} 
                    value={songInfo.currentTime} 
                    onChange={dragHandler} 
                    type="range" 
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={ props.isPlaying ? faPause : faPlay } 
                />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
            <audio 
                onTimeUpdate={timeUpdateHandler} 
                onLoadedMetadata={timeLoadHandler} 
                onEnded={timeEndHandler}
                ref={props.audioRef} 
                src={props.currentSong.audio}
            ></audio>
        </div>
    )
}

export default Player