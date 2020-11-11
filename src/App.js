import React from 'react'
import './styles/app.scss'
import Player from './components/Player'
import Song from './components/Song'
import data from './data'

function App() {
    document.title = 'Music Player'
    return (
        <div className="App">
            <Song />
            <Player />
        </div>
    );
}

export default App;
