const doorImage1 = document.querySelector('#door1');
const doorImage2 = document.querySelector('#door2');
const doorImage3 = document.querySelector('#door3');

const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';

let numClosedDoors = 3;
let currentlyPlaying = true;

const closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

const startButton = document.querySelector('#start');

let openDoor1;
let openDoor2;
let openDoor3;

doorImage1.onclick = () => {
  console.log('Open Door 1');
  if (!isClicked(doorImage1) && currentlyPlaying) {
  	doorImage1.src = openDoor1;
  	playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  console.log('Open Door 2');
 	if (!isClicked(doorImage2) && currentlyPlaying) {
  	doorImage2.src = openDoor2;
  	playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  console.log('Open Door 3');
  if (!isClicked(doorImage3) && currentlyPlaying) {
  	doorImage3.src = openDoor3;
  	playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  
  if (!currentlyPlaying) {
  startRound();
  }
}

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else if (status === 'lose') {
    startButton.innerHTML = 'You lose! Play again?';
  }
  currentlyPlaying = false;
}

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  console.log(choreDoor);
  
  if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
    
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  } else if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  }
  
}

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

const playDoor = (door) => {
  numClosedDoors -= 1;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door) === true) {
    gameOver('lose');
  }
}

startRound();
