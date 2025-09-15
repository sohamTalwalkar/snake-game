//Snake Game
//Limited Only to PC

class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    findTail(){
        if(this.head === null){this.tail = null; return;}
        let n1 = this.head;
        while(n1.next!==null){
            n1 = n1.next;
        }
        this.tail = n1;
        return this.tail;
    }

    size(){
        let n1 = this.head;
        let i = 0;
        while(n1!=null){
            n1 = n1.next;
            i++;
        }
        this.length = i;
        return this.length;
    }

    add(data){
        if(this.head == null){
            let newer = new Node(data);
            this.head = newer;
            return;
        }
        let n1 = this.head;
        let n2 = new Node(data);
        while(n1.next!=null){
            n1 = n1.next;
        }
        n1.next = n2;
        n2.next = null;
    }

    display(){
        let n1 = this.head;
        while(n1!=null){
            console.log(n1.data + "->");
            n1 = n1.next;
        }
        console.log(null);
    }

    reverse(){
    let prev = null;
    let curr = this.head;

    while(curr!==null){
        let nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }
    temp.head = prev;
    }
}

//Initialization
let screen = document.querySelector(".game-screen");
let pixels = [];

for(let i = 0; i < 625; i++) {
    let pixel = document.createElement("div");
    pixel.className = "pixels";
    screen.appendChild(pixel);
    pixels.push(pixel);
}

let fruit = Math.floor(Math.random() * 625);
pixels[fruit].classList.add("fruitClass");

let snakeHead;
do{
    snakeHead = Math.floor(Math.random() * 625);
} while ((snakeHead < 75) || (snakeHead >= 575));
let snakeBodyArray = [];

for(let i = 0; i < 3; i++){
    snakeBodyArray.push(snakeHead+(i*25) < 625? snakeHead+(i*25) : snakeHead - 625);
}

let snakeBody = new LinkedList();
for(let i = 0; i < snakeBodyArray.length; i++){
    snakeBody.add(snakeBodyArray[i]);
}
let temp = snakeBody;
let nd = temp.head;

function color(ll){
    let nd = ll.head;
    while(nd!==null){
        pixels[nd.data].classList.add("snakeBodyClass");
        nd = nd.next;
    }
}
function remColor(ll){
    let nd = ll.head;
    while(nd!==null){
        pixels[nd.data].classList.remove("snakeBodyClass");
        nd = nd.next;
    }
}
color(temp);

function recreate(){
    do{
        snakeHead = Math.floor(Math.random() * 625);
    } while ((snakeHead < 75) || (snakeHead >= 575));
    snakeBodyArray = [];

    for(let i = 0; i < 3; i++){
        snakeBodyArray.push(snakeHead+(i*25) < 625? snakeHead+(i*25) : snakeHead - 625);
    }

    snakeBody = new LinkedList();
    for(let i = 0; i < snakeBodyArray.length; i++){
        snakeBody.add(snakeBodyArray[i]);
    }
    temp = snakeBody;
    color(temp);
}

//Adding motion
let dir = "up";
let stop = false;
let fruitFound = false;

function move(dir){
    let nodeData;
    let currHead = temp.head;
    switch(dir){
        case "up":
            nodeData = snakeHead-25 >= 0? snakeHead-25 : 600+snakeHead;
            break;
        case "down":
            nodeData = snakeHead+25 < 625? snakeHead+25 : snakeHead-600;
            break;
        case "right":
            nodeData = ((currHead.data + 1)%25 === 0)? currHead.data - 24 : currHead.data + 1;
            break;
        case "left":
            nodeData = ((currHead.data)%25 === 0)? currHead.data + 24 : currHead.data - 1;
            break;    
    }

    let newNode = new Node(nodeData);
    if(pixels[newNode.data].classList.contains("snakeBodyClass")){stop = true; return;}
    if(newNode.data === fruit) fruitFound = true;

    newNode.next = currHead;
    temp.head = newNode;
    snakeHead = newNode.data;

    while(newNode.next.next !== null){
        newNode = newNode.next;
    }
    pixels[newNode.next.data].classList.remove("snakeBodyClass");
    newNode.next = null;
    color(temp);
}

//Events
let init = document.querySelector(".StartStop");
let intervalID = null;

init.addEventListener("click", () => {
    if(intervalID !== null) return;

    intervalID = setInterval(() => {
        move(dir);
        if(stop) {
            clearInterval(intervalID);
            alert(`Snake crashed! Your score is: ${snakeBody.size()}.`);
            remColor(temp); 
            recreate(); 
            stop = false; 
            intervalID = null;
            return;
        }
        if(fruitFound) {
            temp.add(snakeBody.findTail().data + 1);
            pixels[fruit].classList.remove("fruitClass");
            do{
                fruit = Math.floor(Math.random() * 625);
            } while(pixels[fruit].classList.contains("snakeBodyClass"));
            pixels[fruit].classList.add("fruitClass");
            fruitFound = false;
        }
    }, 400);
});

let isUp = true;
let isDown = false;
let isRight = false;
let isLeft = false;

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case "ArrowUp":
            if(isDown) return;
            dir = "up";
            isUp = true;
            isDown = false;
            isRight = false;
            isLeft = false;
            break;
        case "ArrowDown":
            if(isUp) return;
            dir = "down";
            isUp = false;
            isDown = true;
            isRight = false;
            isLeft = false;
            break;
        case "ArrowRight":
            if(isLeft) return;
            dir = "right";
            isUp = false;
            isDown = false;
            isRight = true;
            isLeft = false;
            break;
        case "ArrowLeft":
            if(isRight) return;
            dir = "left";
            isUp = false;
            isDown = false;
            isRight = false;
            isLeft = true;
            break;   
    }
});




