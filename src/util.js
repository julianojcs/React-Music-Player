export const activedSong = (songs) => {
    return songs.findIndex((song) => song.active)
} 