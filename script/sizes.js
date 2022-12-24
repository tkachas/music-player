'use strict'
let content = document.querySelector('.content');
let head = document.querySelector('.head');
let musAnim = document.querySelector('.mus-anim');
let nowPlaying = document.querySelector('.playing-now');

content.style.minHeight = (parseInt(window.innerHeight) - (parseInt(getComputedStyle(content).top) + parseInt(getComputedStyle(head).height)) - 2) +'px';


musAnim.style.height = parseInt(getComputedStyle(musAnim).width)/5 + 'px';

window.addEventListener('resize', ()=>{
    content.style.minHeight = (parseInt(window.innerHeight) - (parseInt(getComputedStyle(content).top) + parseInt(getComputedStyle(head).height)) - 2) +'px';
    musAnim.style.height = parseInt(getComputedStyle(musAnim).width)/5 + 'px';
    nowPlaying.style.width = getComputedStyle(musAnim).width;
});


nowPlaying.style.width = getComputedStyle(musAnim).width;
nowPlaying.style.left = getComputedStyle(head).left;

