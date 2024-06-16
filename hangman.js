const hangMAn_Images=document.querySelector(".hangman-box img")
const keyboardDiv=document.querySelector(".keyboard")
const wordDisplay=document.querySelector(".word-display")
const Guess_text=document.querySelector(".guesses-text b")
const hintEl=document.querySelector(".hint-text b")
const gameModal=document.querySelector(".game-modal")
const playAgain=document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount
const maxGuessCount = 6

//reseting all game variables and UI elements
const resetgame =()=>{
    correctLetters=[]
    wrongGuessCount=0
    hangMAn_Images.src=`images/hangman-${wrongGuessCount}.svg`
    Guess_text.innerText=`${wrongGuessCount}/${maxGuessCount}`
    wordDisplay.innerHTML= currentWord.split("").map(()=>` <li class="letter"></li>`).join("")
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false)
    gameModal.classList.remove("show")

}

const getRandomWord = () => {
    //selecting a random word and hint and displaying it
    const { word,hint }= wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word)
    hintEl.innerText = hint
    resetgame()
}


//after winnig or losing showing game modal with respective ui
const gameOver= (isVictory) => {
    setTimeout(()=>{
        const modalText= isVictory ? `You found the word:` : `The correct word was:`
        gameModal.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`
        gameModal.querySelector("h4").innerText=`${isVictory ? "CONGRATULATION!" : "GAME OVER!"}`
        gameModal.querySelector("p").innerHTML=`${modalText} <b> ${currentWord} </b>`
        gameModal.classList.add("show");
    },300);
}

//checking if clickedletter exist on the currentword
const initGame = (button, clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        //showing corrext letters....
        [...currentWord].forEach((letter,index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else
    {
        //If wrong letter is clicked then incorrect guesses no. increases and hangman images too.
        wrongGuessCount++
        hangMAn_Images.src=`images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true
    Guess_text.innerText=`${wrongGuessCount}/${maxGuessCount}`

    if(wrongGuessCount===maxGuessCount) return gameOver(false)
    if(correctLetters.length===currentWord.length) return gameOver(true)
        
}

//Creating keyboard buttons and addEventListener
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button); 
    button.addEventListener("click",event=> initGame(event.target,String.fromCharCode(i)))  
}

getRandomWord();

playAgain.addEventListener("click",getRandomWord)