let progressStatus = false;
let refreshProgressId;

let currentTitle = document.getElementById("current-title");
let currentArtist = document.getElementById("current-artist");

let songState = 1
let likeStatus = false;

const menuSec = document.getElementById("menu-sec");


document.addEventListener("click",  (e) => {
    const target = e.target;
    const parrentID = target.closest(".song-title").id;
    songState = parrentID
    updateCurrentSong(parrentID);
});

function showLikePopUp() {
    const hideElement = document.getElementById("like");
    hideElement.style.display = "flex";

    setTimeout(() => {
        hideElement.style.display = "none";
    }, 3000);
    filloutLike();
}

function filloutLike() {
    if(likeStatus == true) {
        likeStatus = false;
        const likeButton = document.getElementById("like-button");
        likeButton.setAttribute("src", "herz.png");
    } else {
        likeStatus = true;
        const likeButton = document.getElementById("like-button");
        likeButton.setAttribute("src", "herzactive.png");
    };
}

function playSong() {
    if(progressStatus == false) {
        progressStatus = true;
    } else {
        progressStatus = false;
    };

    clearInterval(refreshProgressId);

    if(progressStatus == true) {
        refreshProgressId = setInterval(() => {
           let progressValue = document.getElementById("progress");
            val = progressValue.getAttribute("value");
            if (val < 100) {
                val++;
                progressValue.setAttribute("value", val);
            } else {
                progressValue.setAttribute("value", "0");
                handleSongQueue();
            }
            
        }, 500)
    };
}

function getSongInfos(parrentElementID) {
    let details = [];
    const titleName = document.getElementById(parrentElementID).childNodes[1].innerHTML;
    const titleArtist = document.getElementById(parrentElementID).childNodes[3].innerHTML;
    details.push(titleName);
    details.push(titleArtist);
    return details;
}

function updateCurrentSong(parrentElementID) {
    const details = getSongInfos(parrentElementID);

    currentTitle.innerHTML = details[0];
    currentArtist.innerHTML = details[1];
}

function handleSongQueue() {
    if(songState < 20) {
        songState++;
    } else {
        songState = 1;
    }

    updateCurrentSong(songState);
}

function showMenuPage() {
    menuSec.style.display = "block";
}

function closeMenu() {
    menuSec.style.display = "none";
}

updateCurrentSong(songState);
