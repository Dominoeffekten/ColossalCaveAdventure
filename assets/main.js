'use strict';

/*
//pokemon api
 https://pokeapi.co/docs/v2#locations-section

 //info pm byerne
https://www.dexerto.com/pokemon/pokemon-lets-go-map-kanto-region-221646/

*/


// save keystrokes for queryseletor
const select = function (foo) { 
    return document.querySelector(foo);
}

//variables
let userLetter = []; //make a variable with the user letters
let storage = [{"name": "Pikachu", "type":"Electric"}]; //how make pokemons do the user have?

//get elements
let cursor = select(".fa-square-full"); //get square
let userText = select(".userText"); //get the p for the user text
let placeText = select(".placeTextHere"); //get the place for the user text





//instructions
function instructions(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `Somewhere nearby is the Pokemon Leauge where others have fought and won legendary pokemons. 
    Magic is said to dominate the way there. I will be your eyes and hands. Direct me with commands of 1 or 2 words. 
    I should warn you that I look at only the first 5 letters of each word (should you get stuck type "help" for some generel hints)`;
    placeText.appendChild(paragraph);
};

function intro(){
    let json = { //info about the city
        "name": "Pallet Town",
        "battle" : "none",
        "pokemon":{
            "name": "Venonat",
            "type":"Bug"
        },
        "info": "Starting and home town. Calm and tranquil.",
        "task": "catch pokemon"
    };
    //what do the user see?
    let paragraph = document.createElement("p");
    paragraph.innerHTML = `You are at ${json.name} on a road. In front of you is there a small brick building. Around you is a forrest. `;
    placeText.appendChild(paragraph);

    //when the user go to the building
    function roads(){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `You stand in front of the building. there is a road to the left and to the right. The road to the right is dark and something is moving. 
        The road to the left is lighted up by lampposts`;
        placeText.appendChild(paragraph);
    };
    //on the left road is there a pokemon the user need to capture
    function leftRoad(){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `You walked to the left. It is a long and dark road. You walk for 20 mins when you hear somehting in the bushes.
        You stop and look over there. You can hear it moving. It is everywhere. It stops. You go back to the building.
        Suddenly something is in front of you. It is a pokemon`;
        placeText.appendChild(paragraph);
        if(userLetter.join(" ") == "catch pokemon"){
            storage.push(json.pokemon)
        } else{
            dontUnderstand();
        }
    };
    //The road to the next city
    function rightRoad(){
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `You walked to the right. The road is nice you walk for 30 mins and see a new road`;
        placeText.appendChild(paragraph);
        city1();
    };
};

function talkToPerson(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `The person introduce her self as ${json.battle.gymLeader}. She has a ${json.battle.type} type pokemon.
    It is ${json.battle.pokemon}. What will you do?`;
    placeText.appendChild(paragraph);
};

function battle(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `You choose to battle ${json.battle.pokemon}. The pokemon is weak to ${json.battle.weakness}. 
    Which pokemon will you choose to battle with?`;
    placeText.appendChild(paragraph);
    if(json.battle.weakness == storage[1]){
        
    }
}

function city1(){
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
        "task": "battle pokemon"
    };
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `There is a sign with the name ${json.name}. You can go to the left or right`;
    placeText.appendChild(paragraph);
    
    //the road back to the last city
    function backRoad(){
        intro();
    };
    //meet the trainer and battle them
    function leftRoad(){
        let paragraph = document.createElement("p"); //make a paragraph
        paragraph.innerHTML = `You go the the right and raound a corner, where you see a person.`;
        placeText.appendChild(paragraph);
    };
    //to go around the trainer
    function rightRoad(){
        let paragraph = document.createElement("p"); //make a paragraph
        paragraph.innerHTML = ``;
        placeText.appendChild(paragraph);
    }
};
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







//something is wrong
function dontUnderstand(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `Sorry I don't understand. If you are stuck type "help" for some generel hints`;
    placeText.appendChild(paragraph);
};
function help(){
    let paragraph = document.createElement("p"); //make a paragraph
    paragraph.innerHTML = `I know of places, actions and things. Most of my vocabulary describes places and is used to you there. To move, try words like forest, building, enter, right, left, back. 
    I know about a few special creatures, like pokemons. you can catch them. Usally you will need to give both the object and action words, but sometimes I can infer the object from the verb alone.
    Some obejcts have also imply verbs; in particular "storage" implies "see storage" which causes me to give you a list of the pokemons you have catched`;
    placeText.appendChild(paragraph);
}






//what does the user push on?
window.addEventListener("keyup", function(e){
    
    var charCode = e.keyCode;
    console.log(charCode);
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32) {
        //if you press any letters
        userLetter.push(e.key);
        //push inside the array
        userText.innerHTML = userLetter.join('');
        //make it visieble on the site
    } else if(charCode == 8){
        //if you press backspace
        userLetter.splice(userLetter.length-1, 1);
        //delete the numbers og arrays - 2 from behind
        userText.innerHTML = userLetter.join('');
        //make it visble on the site
    }else if(charCode == 13){
        //if you press enter
        let paragraph = document.createElement("p"); //make a paragraph
        paragraph.innerHTML += userLetter.join('');
        placeText.append(paragraph);
        //take the array and push it on the site
        userLetter = [];
        //delete the array
        userText.innerHTML = userLetter;
        //push in the green box
    }else{
        return false;
    };
});

//get the cursor to blink
setInterval(function() {
    cursor.classList.toggle("blink");
}, 600);




