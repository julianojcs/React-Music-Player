import React from 'react'

const LibrarySong = (props) => {

    const songSelectHandler = async () => {
        await props.setCurrentSong(props.song)
        console.log(props.id)

        const newSongs = props.songs.map((song) => {
            return (
                (song.id === props.id) 
                    ? { ...song, active: true}
                    : { ...song, active: false}
            )
        })

        props.setSongs(newSongs)

        if (props.isPlaying) {
            const playPromise = props.audioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    props.audioRef.current.play()
                })
            }
        //     props.audioRef.current.play()
        // } else {
        //     props.audioRef.current.pause()
        }
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