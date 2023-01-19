let songIndex = 0;
let audioElement = new Audio('audio/4.mp3');
let masterPlay = document.getElementById("masterPlay");
let seekbar = document.getElementById("seekbar");
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName:"Kesariya - Bramhastra", filePath:"audio/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Jehda Nasha - An Action Hero", filePath:"audio/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Dil - Ek Villain", filePath:"audio/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Rangi Saari - Jugjugg Jeeyo", filePath:"audio/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Naacho Naacho", filePath:"audio/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Mann Meri Jaan", filePath:"audio/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Doobey - Gehraiyaan", filePath:"audio/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Apna Bana Le - Bhediya", filePath:"audio/8.mp3", coverPath:"covers/8.jpg"},
    {songName:"Manike - Thank God", filePath:"audio/9.mp3", coverPath:"covers/9.jpg"},
    {songName:"Dholida - Gangubai Kathiawadi", filePath:"audio/10.mp3", coverPath:"covers/10.jpg"}
];

songItem.forEach((element, i) => {
    
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.src = "images/pause.png";        
        masterPlay.style.width = "25px";
    } else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.src = "images/play.png";        
        masterPlay.style.width = "35px";

    }
})

audioElement.addEventListener('timeupdate', (event) => {
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);    
    seekbar.value = progress
})

seekbar.addEventListener('change', () => {
    audioElement.currentTime = seekbar.value * audioElement.duration /100;
})

const makeAllPlays = function() {
    Array.from(document.getElementsByClassName("mainIcons")).forEach(elem => {
        elem.src = "images/play.png";
        elem.style.width = "35px";        
    })
}

Array.from(document.getElementsByClassName("mainIcons")).forEach(element => {
    element.addEventListener('click', (event) => {
        makeAllPlays();
        songIndex = parseInt(event.target.id);
        element.style.width = "25px";
        event.target.src = "images/pause.png";      
        audioElement.src = `audio/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.src = "images/pause.png";        
        masterPlay.style.width = "25px";        
    })
})

document.getElementById("previous").addEventListener('click', event => {
    if(songIndex <= 1) {
        songIndex = 10;        
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `audio/${songIndex}.mp3`;
    audioElement.play();
    document.getElementById('songInfo').innerText = songs[songIndex - 1].songName;
    masterPlay.src = "images/pause.png";        
    masterPlay.style.width = "25px";
})

document.getElementById("next").addEventListener('click', event => {
    if(songIndex >= 10) {
        songIndex = 1;        
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `audio/${songIndex}.mp3`;
    audioElement.play();
    document.getElementById('songInfo').innerText = songs[songIndex - 1].songName;
    masterPlay.src = "images/pause.png";        
    masterPlay.style.width = "25px";
})


