// Require user input
const prompt = require('prompt-sync')({sigint: true});

// Tree class
function Node(data) {
  this.data = data;
  this.children = [];
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(data, toNodeData) {
    const node = new Node(data);
    
    const parent = toNodeData ? this.findBFS(toNodeData) : null;

    if (parent) {
      parent.children.push(node);
    } else {
      if (!this.root) {
        this.root = node;
      } else {
        return "Tried to store node at root when root already exists.";
      }
    }
  }

  findBFS(data) {
    const queue = [this.root];
    let _node = null;

    this.traverseBFS((node) => {
      if (node.data == data) {
        _node = node;
      }
    })

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];

    if(cb) {
      while(queue.length) {
        const node = queue.shift();

        cb(node);

        for (const child of node.children) {
          queue.push(child);
        }
      }
    }
  }
}

// How to log the tree:
//tree.traverseBFS((node) => {console.log("Current node: ", node);});
//console.log(tree.findBFS("Node2"));

// Possible places
/* Order:
name, once/always, extra dice skill,
success dice number, success dice value, losing effect, success effect,  */
const PLACES1 = {
  1 : ["Excavation", "once", "dig", 2, 6, "-1 food / -1 dice"],
  2 : ["Excavation", "once", "dig", 2, 6, "-1 food / -1 dice"],
  3 : ["Excavation", "once", "dig", 2, 6, "-1 food / -1 dice"],
  4 : ["Cable Run"],
  5 : ["Narrow Ledge"],
  6 : ["Skirting Boards"]
}

// Game starts HERE
let gameOver = false;
const SKILLS = ["climbing", "creeping", "digging", "fighting", "hunting"];
let skill;
let tree = new Tree();
tree.add("Entrance");
let currentPlace = tree.findBFS("Entrance");

// Setting the dice
function roll(k) {
  return Math.floor(Math.random() * k) + 1;
}

// Roll the dice (TESTING!!!)
let dice1 = roll(1);
let dice2 = roll(6);

// Pick the skill
console.log("Pick one of the following skills (1-5):");
SKILLS.forEach(skill => {
  console.log(`${SKILLS.indexOf(skill) + 1}. ${skill}`);
});

while (!skill) {
  let skillInput = prompt("Pick your skill: ");
  if (skillInput.length == 1 && skillInput > 0 && skillInput < 6) {
    skill = skillInput;
    console.log(`You picked ${SKILLS[skill - 1]}!`);
  } else {
    console.log("Enter a number between 1 and 5.");
  }

}

// Log current place
console.log(`You are here: ${currentPlace.data}`);

while (!gameOver) {

  let pickPath = prompt("Pick a path: ");
  console.log(`You picked ${pickPath}!`);
}