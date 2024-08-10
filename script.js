let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let turnO = true; // true for O, false for X
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("blue");
      box.classList.remove("red");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("red");
      box.classList.remove("blue");
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("red", "blue"); // Ensure class is removed
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  let filledBoxes = 0;

  for (const pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;  
    let pos3Val = boxes[pattern[2]].innerText; 
    
    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }

  // Check for draw
  for (const box of boxes) {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  }

  if (filledBoxes === boxes.length) {
    setTimeout(() => {
      msg.innerText = "It's a Draw!";
      msgContainer.classList.remove("hide");
      disableBoxes();
    }, 100); // Adding a slight delay for better UX
  }
};

resetBtn.addEventListener("click", resetGame);
