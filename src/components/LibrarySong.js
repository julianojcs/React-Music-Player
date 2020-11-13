import React from 'react'
import { playAudio } from '../util'

const LibrarySong = (props) => {

    const songSelectHandler = async () => {
        await props.setCurrentSong(props.song)

        const newSongs = props.songs.map((song) => {
            return (
                (song.id === props.id) 
                    ? { ...song, active: true}
                    : { ...song, active: false}
            )
        })

        props.setSongs(newSongs)

        playAudio(props.isPlaying, props.audioRef)

    }

    return(
        <div onClick={songSelectHandler} className={`library-song ${props.song.active ? 'active' : ''}`} >
            <img src={props.song.cover} alt={props.song.name}/>
            <div className="song-description">
                <h3>{props.song.name}</h3>
                <h4>{props.song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong