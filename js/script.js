class SimonSaysGame {
  constructor() {
    this.colors = ["blue", "green", "yellow", "red"];
    this.sequence = [];
    this.humanSequence = [];
    this.level = 1;
    this.randomColor = Math.floor(Math.random() * this.colors.length);
    this.startScreen = document.getElementById("game-intro");
    this.startButton = document.getElementById("start-button");
    this.gameContainer = document.getElementById("game-container");
    this.paragraphLevel = document.getElementsByClassName("level");
    this.gameButtons = document.getElementsByClassName("game-button");
    this.startButton.addEventListener("click", () => {
      this.startGame();
    });
    this.restartButton = document.querySelector("#restart-button");
    this.restartButton.addEventListener("click", () => {
      this.restart();
    });
    this.message = document.querySelector(".info");
    this.endScreen = document.querySelector("#game-end");
    this.levelDisplay = document.querySelector(".level-display");
    this.endLevel = document.querySelector(".game-end-level");
    this.disableClick = document.getElementsByClassName("unclickable");
    this.initialRender = true;
  }
  getUserInput(color) {
    this.humanSequence.push(color);

    if (this.humanSequence.length === this.sequence.length) {
      if (this.checkSequences()) {
        this.message.textContent = "Awesome, next round!";
        this.playPassSound();
        this.humanSequence = [];
        this.nextRound();
      } else {
        this.endGame();
        //this.message.textContent = "NOPE! Game over";
      }
    }
  }
  checkSequences() {
    for (let i = 0; i < this.sequence.length; i++) {
      if (this.sequence[i] !== this.humanSequence[i]) {
        return false;
      }
    }
    return true;
  }
  nextStep() {
    const random = this.colors[Math.floor(Math.random() * this.colors.length)];
    return random;
  }
  nextRound() {
    if (this.initialRender) {
      this.initialRender = false;
      this.levelDisplay.textContent = `Level: ${this.level}`;
      this.sequence.push(this.nextStep());
      const delayBtwRounds = 1800;
      setTimeout(() => {
        this.message.textContent = `Computer's turn! ${
          this.sequence.length
        } Tap${this.sequence.length > 1 ? "s" : ""}`;
        this.playRound(this.sequence);
        this.enableUserInput();
      }, delayBtwRounds);
      return;
    }
    this.level += 1;
    this.levelDisplay.textContent = `Level: ${this.level}`;
    this.sequence.push(this.nextStep());
    const delayBtwRounds = 1800;

    setTimeout(() => {
      this.message.textContent = `Computer's turn! ${this.sequence.length} Tap${
        this.sequence.length > 1 ? "s" : ""
      }`;
      this.playRound(this.sequence);
      this.enableUserInput();
    }, delayBtwRounds);
  }
  playRound(nextSequence) {
    let delay = 0;
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        this.colorButton(color);
      }, delay);
      delay += 1400;
    });

    setTimeout(() => {
      this.message.textContent = `Your turn! ${this.sequence.length} Tap${
        this.sequence.length > 1 ? "s" : ""
      }`;
      this.enableUserInput();
    }, delay + 500);
  }
  colorButton(color) {
    const buttonToLight = document.querySelector(
      `[data-game-button='${color}']`
    );
    const sound = document.querySelector(`[data-sound='${color}']`);

    buttonToLight.classList.add("turnedOn");
    buttonToLight.style.border = "5px solid white";
    sound.play();

    setTimeout(() => {
      buttonToLight.classList.remove("turnedOn");
      buttonToLight.style.border = "none";
    }, 300);
  }
  enableUserInput() {
    const gameButtons = document.getElementsByClassName("game-button");
    for (const button of gameButtons) {
      button.disabled = false;
    }
  }
  playSound(color) {
    const sound = document.querySelector(`[data-sound='${color}']`);
    sound.play();
  }
  playPassSound() {
    const soundPass = document.querySelector(`[data-sound='passYay']`);
    soundPass.play();
  }
  playEndSound() {
    const endSound = document.querySelector(`[data-sound='endLaugh']`);
    endSound.play();
  }
  startGame() {
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "block";
    console.log("starting game");
    this.message.textContent = `Computer's turn! ${
      this.sequence.length + 1
    } Tap${this.sequence.length > 1 ? "s" : ""}`;
    setTimeout(() => {
      this.nextRound();
    }, 1000);
  }
  endGame() {
    this.endScreen.style.display = "block";
    this.gameContainer.style.display = "none";
    this.endLevel.textContent = `Level Achieved: ${this.level - 1}`;
    this.playEndSound();
  }
  restart() {
    this.endScreen.style.display = "none";
    this.startScreen.style.display = "block";
    this.sequence = [];
    this.humanSequence = [];
    this.level = 1;
    this.levelDisplay.textContent = `Level: ${this.level}`;
    this.initialRender = true;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const simonGame = new SimonSaysGame();

  const gameButtons = document.getElementsByClassName("game-button");
  for (const button of gameButtons) {
    button.addEventListener("click", () => {
      const color = button.getAttribute("data-game-button");
      simonGame.getUserInput(color);
      simonGame.playSound(color);
      button.classList.add("pressed");
      setTimeout(() => {
        button.classList.remove("pressed");
      }, 300);
    });
  }
});
//feature branch add test
