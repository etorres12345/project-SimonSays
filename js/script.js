class SimonSaysGame {
  constructor() {
    // Game Properties
    this.colors = ["blue", "green", "yellow", "red"];
    this.sequence = [];
    this.humanSequence = [];
    this.level = 1;
    this.initialRender = true;
    this.disableClick = document.getElementsByClassName("unclickable");

    // Page Elements
    this.startScreen = document.getElementById("game-intro");
    this.gameContainer = document.getElementById("game-container");
    this.endScreen = document.querySelector("#game-end");

    // Button Elements
    this.startButton = document.getElementById("start-button");
    this.gameButtons = document.getElementsByClassName("game-button");
    this.restartButton = document.querySelector("#restart-button");

    // Game information Display
    this.message = document.querySelector(".info");
    this.levelDisplay = document.querySelector(".level-display");
    this.paragraphLevel = document.getElementsByClassName("level");
    this.endLevel = document.querySelector(".game-end-level");

    // Event Listeners
    this.startButton.addEventListener("click", () => {
      this.startGame();
    });
    this.restartButton.addEventListener("click", () => {
      this.restart();
    });
  }

  // When user clicks a button after the computer sequence:
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

  // Picks a random color for the next step
  nextStep() {
    const random = this.colors[Math.floor(Math.random() * this.colors.length)];
    return random;
  }

  // start next round of game
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
        this.enableUserInput();
        this.playRound(this.sequence); //display computer sequence
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
      this.enableUserInput();
      this.playRound(this.sequence); //display computer sequence
    }, delayBtwRounds);
  }

  // Display the game sequence
  playRound(nextSequence) {
    let delay = 0;
    this.disableUserInput();
    nextSequence.forEach((color, index) => {
      setTimeout(() => {
        this.colorButton(color); //Display the highlighted game button with delay
      }, delay);
      delay += 1400; // Increase the delay for each next game button highlight
    });

    // setTimout to display user turn message and enable clicking
    setTimeout(() => {
      this.message.textContent = `Your turn! ${this.sequence.length} Tap${
        this.sequence.length > 1 ? "s" : ""
      }`;
      this.enableUserInput();
    }, delay + 300);
  }

  // Highlight game button and play associated sound
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
    }, 250);
  }

  // enable game buttons
  enableUserInput() {
    for (const button of this.gameButtons) {
      button.disabled = false;
    }
  }

  // disable game buttons
  disableUserInput() {
    for (const button of this.gameButtons) {
      button.disabled = true;
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
    this.message.textContent = `Computer's turn! ${
      this.sequence.length + 1
    } Tap${this.sequence.length > 1 ? "s" : ""}`;
    setTimeout(() => {
      this.nextRound();
    }, 700);
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
