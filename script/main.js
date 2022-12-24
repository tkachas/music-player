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
let playNext = document.querySelector('.play-next');
let playPrev = document.querySelector('.play-previous');


let progressBarDiv = document.querySelector('.progress-bar');
let progressBarFiller = document.querySelector('.progress-bar-filler');
let progressBarPointer = document.querySelector('.progress-bar-pointer');

let startSong = new Audio();
let playingNow;

let volumeBar = document.querySelector('.volume-control');
let volumeFiller = document.querySelector('.volume-filler');
startSong.volume = parseInt(getComputedStyle(volumeFiller).width) / parseInt(getComputedStyle(volumeBar).width);


let allTracks = [
    ['1', 'Morgenshtern', 'Cadillac','url(\'./img/morgenshtern-cadillac.jpeg\')', './tracks/morgenshtern-cadillac.mp3'],
    ['2', 'Billie Eilish', 'you should see me in the crown', 'url(\'./img/billie-crown.jpeg\')','./tracks/Billie-Eilish-you_should_see_me_in_a_crown.mp3'],
    ['3','Oxxxymiron', 'Bassline Business', 'url(\'./img/oxxxymiron-bassline-business.jpeg\')', './tracks/oxxxymiron-bassline-business.mp3'],
    ['4', 'Хаски', 'Track 03','url(\'./img/haski-track03.jpg\')', './tracks/haski-track03.mp3']
    
]

for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener('click', ()=>{
        for (let j = 0; j < sections.length; j++) {
            sections[j].style.border = 'none';
        }
        sections[i].style.borderBottom = '2px solid red';
        contentRender(sections[i]);
    });
}

setInterval(progressBarPointerMovement(), 200);
initSongs();
playSong();
startSong.addEventListener('timeupdate', progressBar);
volumeBar.addEventListener('click', volumeControl);
playNext.addEventListener('click', nextPrev);
playPrev.addEventListener('click', nextPrev);



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

        let newSongDuration = document.createElement('div');
        newSongDuration.className = 'song-duration';
        newSongDuration.classList.add(allTracks[track][0]);
        let setDuration = new Audio();
        setDuration.src = allTracks[track][4];
        
        setDuration.addEventListener("canplaythrough", event => {
            let minutes = Math.floor(setDuration.duration / 60);
            let seconds = Math.floor(setDuration.duration % 60);
            let secondsWithLeadingZero = seconds < 10 ? '0' + seconds : seconds;
            newSongDuration.innerText = minutes + ':' + secondsWithLeadingZero;
        });
        newSongDuration.innerText = String(setDuration.duration);

        newSongButtonsDiv.appendChild(newSongPlayButton);

        newSongInfo.appendChild(newSongArtist);
        newSongInfo.appendChild(newSongName);

        newSong.appendChild(newSongButtonsDiv);
        newSong.appendChild(newSongImg);
        newSong.appendChild(newSongInfo);
        newSong.appendChild(newSongDuration);

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

}
function nextPrev() {
    let playButton = document.querySelectorAll('.play-song');
    if (this.classList.contains('play-next') && parseInt(playingNow[0])+1 <= allTracks.length) {
       startSong.pause();
       startSong.src = allTracks[playingNow[0]][4];
       playButton[parseInt(playingNow[0]) - 1].classList.remove('fa-pause');
       playButton[parseInt(playingNow[0]) - 1].classList.add('fa-play');
       playingNow = allTracks[playingNow[0]];
       startSong.play();
       playButton[parseInt(playingNow[0]) - 1].classList.remove('fa-play');
       playButton[parseInt(playingNow[0]) - 1].classList.add('fa-pause');
       setCurrentSong(playingNow);
    }
    else if (this.classList.contains('play-previous') && parseInt(playingNow[0])-2 >= 0) {
        startSong.pause();
        startSong.src = allTracks[parseInt(playingNow[0])-2][4];
        playButton[parseInt(playingNow[0]) - 1].classList.remove('fa-pause');
        playButton[parseInt(playingNow[0]) - 1].classList.add('fa-play');
        playingNow = allTracks[parseInt(playingNow[0])-2];
        startSong.play();
        playButton[parseInt(playingNow[0]) - 1].classList.remove('fa-play');
        playButton[parseInt(playingNow[0]) - 1].classList.add('fa-pause');
        setCurrentSong(playingNow);
    }
}


function progressBar(e) {
    const {duration, currentTime} = e.srcElement;
    let progressPersent = currentTime / duration * 100;
    progressBarFiller.style.width = `${progressPersent}%`;

    let songDurationBar = document.querySelectorAll('.song-duration');
    songDurDown();
    function songDurDown() {
        setInterval(function() {
          let timeRemaining = startSong.duration - startSong.currentTime;
          let minutes = Math.floor(timeRemaining / 60);
          let seconds = Math.floor(timeRemaining % 60);
      
          let secondsWithLeadingZero = seconds < 10 ? '0' + seconds : seconds;
          
          for (let i = 0; i < songDurationBar.length; i++) {
            if (songDurationBar[i].classList.contains(playingNow[0])) {
                songDurationBar[i].innerText = minutes + ':' + secondsWithLeadingZero;
            }
          }
        }, 500);
      }
}

function setProgressTime(e) {
    const progressDivWidth = this.clientWidth;
    const clickX = e.pageX - parseInt(getComputedStyle(playingNowWin).left);
    const duration = startSong.duration;

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


function volumeControl(e) {
    volumeFiller.style.width = e.offsetX + 'px';
    startSong.volume = parseInt(getComputedStyle(volumeFiller).width) / parseInt(getComputedStyle(volumeBar).width);
}

function setCurrentSong(songArr) {
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