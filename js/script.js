class SimonSaysGame {
    constructor() {
        this.colors = ['blue', 'green', 'yellow', 'red'];
        this.sequence = [];
        this.playSequence = [];
        this.level = 1;
        this.randomIndex = Math.floor(Math.random() * this.colors.length);
        this.startScreen = document.getElementById("game-intro");
        this.startButton = document.getElementById("start-button");
        this.gameContainer = document.getElementById("game-container");
        this.paragraphLevel = document.getElementsByClassName("level");
        this.gameButtons = document.getElementsByClassName("game-button");
        this.startButton.addEventListener('click', () => {
            this.startGame();
        });
    }
    startGame() {
        this.startScreen.style.display = 'none';
        this.gameContainer.style.display = 'block';
        console.log('starting game');
    }
    playSequence() {
        const intervalDuration = 1000;
        setTimeout(() => {
        for()
        }, intervalDuration);
    }
 }
 const simonGame = new SimonSaysGame();