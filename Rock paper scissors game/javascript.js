let userscore =0;
let computerscore =0;
let container = document.querySelectorAll(".palm");
let msg = document.querySelector("#msg");
let userscorePara = document.querySelector("#user-score");
let computerscorePara = document.querySelector("#computer-score");

let gencomputerchoice = () => {
let options = ["rock", "paper", "scissors"];
let randomidx = Math.floor(Math.random() * 3);
return options[randomidx];
}
let drawgame = () =>{
   
    msg.innerText = "draw game!  Try again!";
    msg.style.backgroundColor = "#081b31";
}
let showwinner = (userwin) => {
    if (userwin){
        userscore++;
        userscorePara.innerText = userscore;
       
        msg.innerText = "You win";
        msg.style.backgroundColor = "green";
    }else{
        computerscore++;
        computerscorePara.innerText = computerscore;
       
        msg.innerText = "you lose";
        msg.style.backgroundColor = "red";
    }
}
    

let playgame= (userchoice) => {
 console.log("user choice=",userchoice);   
let computerchoice = gencomputerchoice();
console.log("computer choice=",computerchoice);
if (userchoice === computerchoice){
  drawgame();  
} else{
    let userwin = true;
    if( userchoice === "rock"){
        userwin = computerchoice === "paper" ? true : false;
    }else if(userchoice === "paper"){
        userwin = computerchoice === "scissors" ? false : true;
}else {
    userwin = computerchoice === "rock" ? false : true;
}
showwinner(userwin);
}
};

container.forEach((palm) => {
    
palm.addEventListener("click", () =>{
    let userchoice =palm.getAttribute("id");
    playgame(userchoice);
});
});