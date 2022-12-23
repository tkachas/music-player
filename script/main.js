'use strict';
let sections = document.querySelectorAll('.section');

let main = document.querySelector('.main-page-content');
let playlists = document.querySelector('.playlists-content');
let songsPage = document.querySelector('.songs-content');



let allTracks = [
    ['1', 'Morgenshtern', 'Cadillac','morgenshtern-cadillac.jpeg'],
    ['2','Oxxxymiron', 'Bassline Business', 'oxxxymiron-bassline-business.jpeg'],
    ['3', 'Хаски', 'Track 03','haski-track03.jpg']
]

class TrackList {
    constructor(id,name,artist,duration, isInUserSongs) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.duration = duration;
        this.isInUserSongs = isInUserSongs;
    }
}

for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener('click', ()=>{
        for (let j = 0; j < sections.length; j++) {
            sections[j].style.borderBottom = 'none';
        }
        sections[i].style.borderBottom = '2px solid red';
        contentRender(sections[i]);
    });
}
initSongs();

function initSongs() {
    for (let track = 0; track < allTracks.length; track++) {
        let newSong = document.createElement('div');
        newSong.className = 'song';
        newSong.classList.add(allTracks[track][0]);

        let newSongButtonsDiv = document.createElement('div');
        newSongButtonsDiv.className = 'song-buttons-div';
        newSongButtonsDiv.classList.add(allTracks[track][0]);

        let newSongPlayButton = document.createElement('i');
        newSongPlayButton.className = 'fa';
        newSongPlayButton.classList.add('fa-play');
        newSongPlayButton.classList.add('play-current');
        newSongPlayButton.id = 'song-buttons';

        let newSongImg = document.createElement('div');
        newSongImg.className = 'song-img';
        newSongImg.classList.add(allTracks[track][0]);
        newSongImg.style.backgroundImage = `url('../img/${allTracks[track][3]}')`;

        let newSongInfo = document.createElement('div');
        newSongInfo.className = 'song-info';
        newSongInfo.classList.add(allTracks[track][0]);

        let newSongArtist = document.createElement('div');
        newSongArtist.className = 'song-artist';
        newSongArtist.classList.add(allTracks[track][0]);
        newSongArtist.innerText = allTracks[track][1];
        

        let newSongName = document.createElement('div');
        newSongName.className = 'song-name';
        newSongName.classList.add(allTracks[track][0]);
        newSongName.innerText = allTracks[track][2];

        newSongButtonsDiv.appendChild(newSongPlayButton);

        newSongInfo.appendChild(newSongArtist);
        newSongInfo.appendChild(newSongName);

        newSong.appendChild(newSongButtonsDiv);
        newSong.appendChild(newSongImg);
        newSong.appendChild(newSongInfo);

        main.appendChild(newSong);


    }
}


function contentRender(pageName) {
    if (pageName.id == 'main-page') {
        renderMain();
    }
    if (pageName.id == 'playlists') {
        renderPlaylists();
    }
    if (pageName.id == 'songs') {
        renderSongs();
    }
}

function renderMain() {
    main.style.display = 'block';
    songsPage.style.display = 'none';
}

function renderPlaylists() {
    main.style.display = 'none';
    songsPage.style.display = 'none';
}

function renderSongs() {
    songsPage.style.display = 'flex';
    main.style.display = 'none';
}