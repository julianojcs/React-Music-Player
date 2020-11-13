import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
// import { useToasts } from "react-toast-notifications";

const Player = (props) => {
    const { currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying, audioRef } = props
    // const { addToast } = useToasts()

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            return (
                (song.id === nextPrev.id) 
                    ? { ...song, active: true}
                    : { ...song, active: false}
            )
        })
        setSongs(newSongs)
        if (isPlaying) audioRef.current.play()
    }
 
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    })

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const playSongHandler = () => {
        setIsPlaying(!isPlaying)
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
    }

    const timeLoadHandler = (e) => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration
        setSongInfo({...songInfo, currentTime, duration})
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration 
        //Calculate Percentage
        const roundedCurrent = Math.round(currentTime)
        const roundedDuration = Math.round(duration)
        const animationPercentage = Math.round(roundedCurrent/roundedDuration * 100);
        
        setSongInfo({
            ...songInfo, 
            currentTime, 
            animationPercentage})
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ 
            ...songInfo, 
            currentTime: e.target.value 
        })
    }

    const songEndHandler = async (e) => {
        const currentIndex = songs.findIndex((song) => song.active)
        const nextIndex = (currentIndex+1) % songs.length  // % = module, rest of division
        await setCurrentSong(songs[nextIndex])

        if (isPlaying) audioRef.current.play()
    }

    const skipTrackHandler = async (direction) => {
        let nextIndex = null
        const currentIndex = songs.findIndex((song) => song.active)
        // let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

        if (direction === "skip-forward") {
            // const nextIndex = (currentIndex+1 === songs.length) ? 0 : currentIndex + 1
            nextIndex = (currentIndex+1) % songs.length  // % = module, rest of division
            await setCurrentSong(songs[nextIndex])
        } else if (direction === "skip-back") {
            nextIndex = (currentIndex === 0) ? songs.length-1 : currentIndex - 1
            await setCurrentSong(songs[nextIndex])
        }
        activeLibraryHandler(songs[nextIndex])
        if (isPlaying) audioRef.current.play()
        console.log('useEffect')
        // addToast("useEffect bla bla bla bla bla bla bla", { appearance: 'info', autoDismiss: true, autoDismissTimeout: 3000 })
    }

    //Add the trackbar Styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className="track">
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler} 
                        type="range" 
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
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
                    icon={ isPlaying ? faPause : faPlay } 
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
                onEnded={songEndHandler}
                ref={audioRef} 
                src={currentSong.audio}
            ></audio>
        </div>
    )
}

export default Player