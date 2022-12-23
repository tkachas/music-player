'use strict';


let sections = document.querySelectorAll('.section');

let main = document.querySelector('.main-page-content');
let playlists = document.querySelector('.playlists-content');
let songsPage = document.querySelector('.songs-content');

let playingNow;

let allTracks = [
    ['1', 'Morgenshtern', 'Cadillac','url(\'./img/morgenshtern-cadillac.jpeg\')', './tracks/morgenshtern-cadillac.mp3'],
    ['2','Oxxxymiron', 'Bassline Business', 'url(\'./img/oxxxymiron-bassline-business.jpeg\')', './tracks/oxxxymiron-bassline-business.mp3'],
    ['3', 'Хаски', 'Track 03','url(\'./img/haski-track03.jpg\')', './tracks/haski-track03.mp3']
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
playSong();

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
        newSongPlayButton.classList.add('play-song');
        newSongPlayButton.classList.add(allTracks[track][0]);
        newSongPlayButton.id = 'song-buttons';

        let newSongImg = document.createElement('div');
        newSongImg.className = 'song-img';
        newSongImg.classList.add(allTracks[track][0]);
        newSongImg.style.backgroundImage = allTracks[track][3];

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

function playSong() {
    let playButton = document.querySelectorAll('.play-song');
    let playSong = new Audio();
    for (let i = 0; i < playButton.length; i++) {
        playButton[i].onclick = () => {
            if (~Array.from(playButton[i].classList).indexOf(String(i+1))) {
                for (let track = 0; track < allTracks.length; track++) {
                    if (allTracks[track][0] == String(i+1)) {
                        if (playingNow !== allTracks[track]) {
                            playSong.pause();
                            playSong.currentTime = 0;
                            console.log(allTracks[track]);
                            setTimeout(()=>{
                                playSong.src = allTracks[track][4];
                                playSong.play();
                                playingNow = allTracks[track];
                            },200);
                        }
                    }
                }
            }
        }
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