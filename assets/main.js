'use strict';

// save keystrokes for queryseletor
const select = function (foo) { 
    return document.querySelector(foo);
}
const $ = function (foo) { 
    return document.getElementById(foo);
}

//variables
let userLetter = []; //make a variable with the user letters
let storage = [{"name": "Pikachu", "type":"Electric"}]; //how make pokemons do the user have?


//get elements
let cursor = select(".fa-square-full"); //get square
let userText = select(".userText"); //get the p for the user text
let placeText = select(".placeTextHere"); //get the place for the user text

let yes = 0;
let building = 0;
let pokemon = 0;
let left = 0;
let right = 0;
let berryNumber;
let takeBerry = 0;
/*--------------------------------

        Do function

--------------------------------*/
function whatToDo(){
    console.log(userLetter.join(''))
    switch(userLetter.join('')){ 
        case "yes": //want instructions
            if (yes == 0){
                description(instructionData.instruction);
                intro();
                yes++;
            } else{
                description(instructionData.dontUnderstand);
            }
            break; 
        case "no": //just want to play
            if (yes == 0){
                intro();
                yes++;
            } else{
                description(instructionData.dontUnderstand);
            }
            break;
        case "help": //want help
            description(instructionData.help);
            break; 
        case "building": //want help
            if (building == 0){
                roads();
                building++;
            } else{
                description(instructionData.dontUnderstand);
            }
            break; 
        case "left": //want to go to the left
            if (left == 0){
                leftRoadIntro();
                left++;
            } else{
                description(instructionData.dontUnderstand);
            }
            break; 
        case "right": //wants to go to the right
            if (right == 0){
                rightRoadIntro();
                right++
            } else{
                description(instructionData.dontUnderstand);
            }
            break; 
        case "catch pokemon": //wants to go to the right
            if (pokemon == 0){
                catchPokemon("Venonat");
                pokemon++
            } else{
                description(instructionData.dontUnderstand);
            }
            break;
        case "take berries": //wants to go to the right
            
            if (takeBerry == 0){
                takeBerry++
                console.log("take berries 2")
            } else{
                description(instructionData.dontUnderstand);
            }
            break;
        case "take" + berryNumber + "berries": //wants to go to the right
            takeBerry++
            console.log("take berries number")
            if (takeBerry == 1){
                console.log("take" + berryNumber + "berries")
            } else{
                description(instructionData.dontUnderstand);
            }
            break;
        case "storage": //wants to see pokemons
            for(let i = 0; i <= storage.length-1; i++){
                let paragraph = document.createElement("p");
                paragraph.innerHTML += storage[0].name //take the array and push it on the site
                placeText.append(paragraph);
            };
            break; 
        default:
            description(instructionData.dontUnderstand);
            break;
    };
};

/*--------------------------------

        Generel functions

--------------------------------*/
//get the cursor to blink
setInterval(function() {
    cursor.classList.toggle("blink");
}, 600);

const description = (text) => {
    let paragraph = document.createElement("p");
    paragraph.innerHTML = text;
    placeText.appendChild(paragraph)
}


/* 
    leader
*/
//talk to a leader
function talkToPerson(gymLeader, type){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `The person introduce her self as ${gymLeader}. She has a ${type} type pokemon.
    It is ${json.battle.pokemon}. What will you do?`;
    placeText.appendChild(paragraph);
};
//battle a leader
function battle(pokemon, weakness){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `You choose to battle ${pokemon}. The pokemon is weak to ${weakness}. 
    Which pokemon will you choose to battle with?`;
    placeText.appendChild(paragraph);
};
/* 
    pokemons 
*/ 
//see a pokemon
function seePokemon(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `It is a pokemon!`;
    placeText.appendChild(paragraph);
};
    //catch a pokemon
    function catchPokemon(pokemon){
        let paragraph = document.createElement("p"); //make a paragraph
        paragraph.innerHTML = `You got ${pokemon}.`;
        placeText.appendChild(paragraph);
    };
/* 
    berries
*/ 
//see food
function seeFood(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `You are in a forrest. There is a lot if berries, that your pokemon love`;
    placeText.appendChild(paragraph);
};
//take food
function takeFood(berryNumber){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `You took ${berryNumber} berries`;
    placeText.appendChild(paragraph);
    
    
};

/*--------------------------------

        DATA

--------------------------------*/
const instructionData = {
    instruction: 
        `Somewhere nearby is the Pokemon Leauge where others have fought and won legendary pokemons. 
        Magic is said to dominate the way there. I will be your eyes and hands. Direct me with commands of 1 or 2 words. 
        I should warn you that I look at only the first 5 letters of each word (should you get stuck type "help" for some generel hints)`,
    help: 
        `I know of places, actions and things. Most of my vocabulary describes places and is used to you there. To move, try words like forest, building, enter, right, left, back. 
        I know about a few special creatures, like pokemons. you can catch them. Usally you will need to give both the object and action words, but sometimes I can infer the object from the verb alone.
        Some obejcts have also imply verbs; in particular "storage" implies "see storage" which causes me to give you a list of the pokemons you have catched`,
    dontUnderstand: 
        `Sorry I don't understand. If you are stuck type "help" for some generel hints`
}

const introData = {
    name: "Pallet Town",
    battle : {},
    pokemon: {
        name: "Venonat",
        type:"Bug"
    },
    info: "Starting and home town. Calm and tranquil.",
    task: "catch pokemon",
    options: ["building", "right", "left"]
}

const city1Data = {
    name: "Pewter City",
    battle: {
        gymLeader: "Brock",
        type: "Rock",
        pokemon: "Geodude",
        weakness: "Fighting"
    },
    pokemon: {},
    info: "Home to the Museum of Science.",
    task: "battle pokemon",
    options: []
}

/*--------------------------------

        city functions

--------------------------------*/
/*  First city  */
function intro(){
    //what do the user see?
    let paragraph = document.createElement("p");
    paragraph.innerHTML = `You are at ${introData.name} on a road. In front of you is there a small brick building. Around you is a forrest. `;
    placeText.appendChild(paragraph);
};
    //when the user go to the building
    function roads(){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `You stand in front of the building. there is a road to the left and to the right. The road to the right is dark and something is moving. 
        The road to the left is lighted up by lampposts`;
        placeText.appendChild(paragraph);
    };
    //on the left road is there a pokemon the user need to capture
    function leftRoadIntro(){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `You walked to the left. It is a long and dark road. You walk for 20 mins when you hear somehting in the bushes.
        You stop and look over there. You can hear it moving. It is everywhere. It stops. You go back to the building.
        Suddenly something is in front of you.`;
        placeText.appendChild(paragraph);
        seePokemon();
    };
    //The road to the next city
    function rightRoadIntro(){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `You walked to the right. The road is nice you walk for 30 mins and see a new road`;
        placeText.appendChild(paragraph);
        city1();
    };

/*  
    Second city  
*/
function city1(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `There is a sign with the name ${city1Data.name}. The road is splitting up. You can go to the left or right`;
    placeText.appendChild(paragraph);
    
    //the road back to the last city
    function backRoad(){
        intro();
    };
    //meet the trainer and battle them
    function leftRoad(){
        let paragraph = document.createElement("p"); //make a paragraph
        paragraph.innerHTML = `You go the the right and around a corner, where you see a person.`;
        placeText.appendChild(paragraph);
    };
    //to go around the trainer
    function rightRoad(){
        let paragraph = document.createElement("p"); //make a paragraph
        paragraph.innerHTML = ``;
        placeText.appendChild(paragraph);
    }
};
//city 2 
function city2(){
    let json = {
        "name": "Pewter City",
        "battle": {
            "gymLeader": "Brock",
            "type": "Rock",
            "pokemon": "Geodude",
            "weakness": "Fighting"
        },
        "pokemon": "none",
        "info": "Home to the Museum of Science.",
        "task": "battle geodude"
    }
    
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `There is a sign with the name `;
    placeText.appendChild(paragraph);
};




/*--------------------------------

        Eventlisteners

--------------------------------*/

//what does the user push on?
window.addEventListener("keyup", function(e){
    var charCode = e.keyCode; //code of numbers
    console.log(charCode)
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32) {//if you press any letters
        userLetter.push(e.key); //push inside the array
        userText.innerHTML = userLetter.join('');//make it visieble on the site
    } else if(charCode == 8){ //if you press backspace
        userLetter.splice(userLetter.length-1, 1);  //delete the numbers og arrays - 2 from behind
        return userText.innerHTML = userLetter.join(''); //make it visble on the site
    } else if(charCode == 13){  //if you press enter
        let paragraph = document.createElement("p");
        paragraph.innerHTML += userLetter.join(''); //take the array and push it on the site
        placeText.append(paragraph);
        whatToDo();
        userLetter = []; //delete the array
        userText.innerHTML = ""; //upload the letters from the user on the site
    }else{
        return false;
    };
});




