'use strict';


let sections = document.querySelectorAll('.section');

let main = document.querySelector('.main-page-content');
let playlists = document.querySelector('.playlists-content');
let songsPage = document.querySelector('.songs-content');

let playingNowWin = document.querySelector('.playing-now');
let playingNowImg = document.querySelector('.current-song-img');
let playingNowArtist = document.querySelector('#current-song-artist');
let playingNowName = document.querySelector('#current-song-name');
let playCurrentButton = document.querySelector('.play-current');


let progressBarDiv = document.querySelector('.progress-bar');
let progressBarFiller = document.querySelector('.progress-bar-filler');
let progressBarPointer = document.querySelector('.progress-bar-pointer');

let startSong = new Audio();
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

setInterval(progressBarPointerMovement(), 200);
initSongs();
playSong();
startSong.addEventListener('timeupdate', progressBar);


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
    playCurrentButton.addEventListener('click', playPauseCurrent);
    for (let i = 0; i < playButton.length; i++) {
        playButton[i].onclick = () => {
            if (~Array.from(playButton[i].classList).indexOf(String(i+1))) {
                if (~Array.from(playButton[i].classList).indexOf('fa-play')) {
                    for (let j = 0; j < playButton.length; j++) {
                        if (j !== i) {
                            playButton[j].classList.add('fa-play');
                            playButton[j].classList.remove('fa-pause');
                        }
                    }
                    playButton[i].classList.remove('fa-play');
                    playCurrentButton.classList.remove('fa-play');
                    playButton[i].classList.add('fa-pause');
                    playCurrentButton.classList.add('fa-pause');
                    for (let track = 0; track < allTracks.length; track++) {
                        if (allTracks[track][0] == String(i+1)) {
                            if (playingNow !== allTracks[track]) {
                                startSong.pause();
                                startSong.currentTime = 0;
                                setTimeout(()=>{
                                    startSong.src = allTracks[track][4];
                                    startSong.play();
                                    setCurrentSong(allTracks[track]);
                                    playingNow = allTracks[track];
                                },200);
                            } else {
                                startSong.play();
                            }
                        }
                    }
                } else {
                    playButton[i].classList.add('fa-play');
                    playCurrentButton.classList.add('fa-play');
                    playButton[i].classList.remove('fa-pause');
                    playCurrentButton.classList.remove('fa-pause');
                    startSong.pause();
                }
            }
        }
    }
}

function playPauseCurrent() {
    let playButton = document.querySelectorAll('.play-song');
    if (playCurrentButton.classList.contains('fa-play')) {
        playCurrentButton.classList.remove('fa-play');
        playCurrentButton.classList.add('fa-pause');
        if (playingNow != undefined) {
            startSong.play();
        } else {
            playingNow = allTracks[0];
            startSong.src = playingNow[4];
            startSong.play();
        }
        playButton[parseInt(playingNow[0]) - 1].classList.remove('fa-play');
        playButton[parseInt(playingNow[0]) - 1].classList.add('fa-pause');
    } else {
        playButton[parseInt(playingNow[0]) - 1].classList.remove('fa-pause');
        playButton[parseInt(playingNow[0]) - 1].classList.add('fa-play');
        playCurrentButton.classList.remove('fa-pause');
        playCurrentButton.classList.add('fa-play');
        startSong.pause();
    }
    console.log('asd');

}


function progressBar(e) {
    const {duration, currentTime} = e.srcElement;
    let progressPersent = currentTime / duration * 100;
    progressBarFiller.style.width = `${progressPersent}%`;
}

function setProgressTime(e) {
    const progressDivWidth = this.clientWidth;
    const clickX = e.pageX - parseInt(getComputedStyle(playingNowWin).left);
    const duration = startSong.duration;
    console.log(clickX);

    startSong.currentTime = (clickX / progressDivWidth) * duration;
}

function progressBarPointerMovement() {
    let ultimateLeft = parseInt(getComputedStyle(playingNowWin).left);
    progressBarDiv.addEventListener('mousemove', (e)=>{
            progressBarPointer.style.display = 'block';
            // progressBarPointer.style.width = (e.pageX - ultimateLeft) + 'px';
            progressBarPointer.style.left = (e.pageX - ultimateLeft) + 'px';
            progressBarDiv.addEventListener('click', setProgressTime);
    });
    progressBarDiv.addEventListener('mouseleave', ()=>{
        progressBarPointer.style.display = 'none';
    });
}

function setCurrentSong(songArr) {
    console.log(songArr);
    playingNowArtist.innerText = songArr[1];
    playingNowName.innerText = songArr[2];
    playingNowImg.style.backgroundImage = songArr[3];
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