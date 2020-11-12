import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

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
        // console.log(props.audioRef.current.currentTime)
        setSongInfo({...songInfo, currentTime: 0})
        // console.log(props.audioRef.current.ended)
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = props.songs.findIndex((song) => song.id === props.currentSong.id)

        if (direction === "skip-forward") {
            // const nextIndex = (currentIndex+1 === props.songs.length) ? 0 : currentIndex + 1
            const nextIndex = (currentIndex+1) % props.songs.length  // % = module, rest of division
            props.setCurrentSong(props.songs[nextIndex])
        } else if (direction === "skip-back") {
            const nextIndex = (currentIndex === 0) ? props.songs.length-1 : currentIndex - 1
            props.setCurrentSong(props.songs[nextIndex])
        }
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    onChange={dragHandler} 
                    type="range" 
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')} 
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft} 
                />
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={ props.isPlaying ? faPause : faPlay } 
                />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')} 
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight} 
                />
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