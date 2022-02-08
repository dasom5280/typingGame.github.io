//사용변수
const GAME_TIME = 3;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay= document.querySelector('.word-display');
const scoreDisplay= document.querySelector('.score');
const timeDisplay= document.querySelector('.time');
const button= document.querySelector('.button');

//시작시 초기화
init();
function init(){
    buttonChange('LOADING...');
    getwords();
    wordInput.addEventListener('input',checkMatch)
}

function checkStatus(){
    if(!isPlaying && time === 0){
        isPlaying = false;
        buttonChange('START!');
        clearInterval(checkInterval);
    }
}

//게임실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('GAMEING!');
}



//단어불러오기
function getwords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=10')
  .then(function (response) {
    response.data.forEach((word)=> {
        if(word.length < 10){
            words.push(word);
        }
    })
    buttonChange('START!');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

//단어일치확인
//wordInput.addEventListener('이벤트','기능')
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}


//남은시간
function countDown(){
    //(조건) ? 참일경우 : 거짓일경우
    time > 0 ? time -- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

//시작버튼
function buttonChange(text) {
    button.innerText = text;
    text === 'START!' ? button.classList.remove('loading') : button.classList.add('loading')
}