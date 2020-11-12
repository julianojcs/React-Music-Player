import React, { useRef, useState } from 'react'
import './styles/app.scss'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
import data from './data'

function App() {
    document.title = 'Music Player'

    const audioRef = useRef(null)  // It is a reference to the audio object at Player.js
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs.find((song) => song.active))   // Use the first song with the active state = true as currentSong initial value
    const [isPlaying, setIsPlaying] = useState(false)
    const [libraryStatus, setLibraryStatus] = useState(false)

    return (
        <div className="App">
            <Nav {...{libraryStatus, setLibraryStatus}}/>
            <Song currentSong={currentSong} />
            <Player 
                {...{setIsPlaying, isPlaying, currentSong, audioRef, songs, setSongs, setCurrentSong}}
                // setIsPlaying={setIsPlaying}
                // isPlaying={isPlaying} 
                // currentSong={currentSong} 
            />
            <Library 
                {...{setSongs, audioRef, isPlaying, libraryStatus}}
                songs={songs}
                setCurrentSong={setCurrentSong}
                // setSongs={setSongs} 
            />
        </div>
    );
}

export default App;
