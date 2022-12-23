'use strict';
let sections = document.querySelectorAll('.section');

let main = document.querySelector('.main-page-content');
let playlists = document.querySelector('.playlists-content');
let songsPage = document.querySelector('.songs-content');


for (let i = 0; i < sections.length; i++) {
    sections[i].addEventListener('click', ()=>{
        for (let j = 0; j < sections.length; j++) {
            sections[j].style.borderBottom = 'none';
        }
        sections[i].style.borderBottom = '2px solid red';
        contentRender(sections[i]);
    });
}

function contentRender(name) {
    if (name.id == 'main-page') {
        renderMain();
    }
    if (name.id == 'playlists') {
        renderPlaylists();
    }
    if (name.id == 'songs') {
        renderSongs();
    }
}

function renderMain() {
    main.style.display = 'flex';
}

function renderPlaylists() {
    main.style.display = 'none';
}

function renderSongs() {
    main.style.display = 'none';
}