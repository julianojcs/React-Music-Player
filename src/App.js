import React, { useState } from 'react'
import './styles/app.scss'
import Player from './components/Player'
import Song from './components/Song'
import data from './data'

function App() {
    document.title = 'Music Player'

    const [songs, setSongs] = useState(data())
    // const [currentSong, setCurrentSong] = useState(songs[0])
    const [currentSong, setCurrentSong] = useState(songs.find((song) => song.active))   // Use the first song with the active state = true as currentSong initial value
    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player currentSong={currentSong} />
        </div>
    );
}

export default App;
