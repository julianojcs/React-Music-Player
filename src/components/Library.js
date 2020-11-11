import React from 'react'
import LibrarySong from './LibrarySong'

const Library = (props) => {
    return (
        <div className="library">
            <h2>Libray</h2>
            <div className="library-songs">
                {
                    props.songs.map(song => 
                        <LibrarySong 
                            song={song} 
                            songs={props.songs} 
                            setCurrentSong={props.setCurrentSong}
                            key={song.id} 
                            id={song.id} 
                            isPlaying={props.isPlaying}
                            setSongs={props.setSongs}
                            audioRef={props.audioRef}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Library