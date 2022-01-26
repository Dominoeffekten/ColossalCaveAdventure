'use strict';

// save keystrokes for queryseletor
const select = function (foo) { 
    return document.querySelector(foo);
}
const $ = function (foo) { 
    return document.getElementById(foo);
}

//variables
let userLetter = []; //A variable with the user letters
let storage = ["Pikachue"]; //number of pokemons

//get elements
let cursor = select(".fa-square-full"); //get square
let userText = select(".userText"); //get the p for the user text
let placeText = select(".placeTextHere"); //get the place for the user text

let instructions = true; //do they want instructions?
let building = true; //intro --> building
let left = 0; //go to left
let right = 0; //go to right
let pokemonNumber = 0; //number og pokemons
let berryNumber; //number og berries
let takeBerry = 0;

let option = 0; //the options the user has taken
let route = []; //which rout the user are one

/*--------------------------------
        Do function
--------------------------------*/

function whatToDo(){
    console.log(option);
    let userAnswear = userLetter.join(''); //user answear
    if (userAnswear.toLowerCase() === "back") { //if the answear is back
        let lastVisit = route.length - 1; //go to last visit place
        switch (route[lastVisit]) {
            case "building":
                city("intro");
                break;
            case "leftRoad":
                roads();
                break;
            case "rightRoad":
                roads();
                break;
            default:
                break;
        }
        route.splice(-1); // remove last index of array
        option--;
    } else {
        if(userAnswear == "help"){ //help
            description(instructionData.help);
        } else if(userAnswear == "storage"){ //storage
            for(let i = 0; i <= storage.length-1; i++){
                description(storage[i]);
            };
        } else if(userAnswear == "yes" && option == 0){ //instruction yes
            description(instructionData.instruction); 
            city("intro"); //first city
            option++; //1
        } else if(userAnswear == "no" && option == 0){ //instruction no
            city("intro"); //first city
            option++; //1
        } else if(userAnswear == "building" && option == 1){
            crossRoads("firstRoad"); //go to crossroads
            option++; //2
        } else if(userAnswear == "right"){ //right
            if (option == 2){
                rightRoad("firstRoad"); //--> catch pokemon --> intro
                option++; //3
                seePokemon("intro"); //venonat
            } else if (option == 4){
                rightRoad("secondRoad"); //--> new city (city2)
                option++; //5
            } else if (option == x){
                rightRoad("thirdRoad"); //--> battle leader (city2)
                option++; //x
            }else{
                description(instructionData.dontUnderstand);
            }; 
        } else if(userAnswear == "left"){ //right
            if (option == 4){
                leftRoad("firstRoad");  //--> new city (city 1)
                option++; // 4
            } else if (option == 5){
                leftRoad("secondRoad");  //--> battle leader (city 1)
                option++; //5
            } else if (option == 6){
                leftRoad("thirdRoad");  //--> catch pokemon (dragonnite)
                option++; //7
            }else{
                description(instructionData.dontUnderstand);
            }; 
        } else if(userAnswear == "catch"){//catch pokemon
            if(option == 5){
                getPokemon("intro");
            }
        } else{
            description(instructionData.dontUnderstand);
        };
    };
};

/*--------------------------------
        Generel functions
--------------------------------*/
//get the cursor to blink
setInterval(function() {
    cursor.classList.toggle("blink");
}, 600);
//make a paragraph
const description = (text) => {
    let paragraph = document.createElement("p");
    paragraph.innerHTML = text;
    placeText.appendChild(paragraph)
};

/*--------------------------------
        DATA
--------------------------------*/
/*      instructions     */
const instructionData = {
    instruction: 
        `Somewhere nearby is the Pokemon Leauge where others have fought and won legendary pokemons. 
        It is a challenge to win the legendary poekmons. 
        But I will be your eyes and hands. Direct me with commands of 1 or 2 words. 
        If you should get stuck type "help" for some generel hints`,
    help: 
        `I know of places, actions and things. Most of my vocabulary describes places and is used to you there. 
        To move, try words like building, enter, right, left or back. 
        I know about a few special creatures, like pokemons. You can catch them. 
        Usally you will need to give both the object and action words, 
        but sometimes I can infer the object from the verb alone.
        Some obejcts have also imply verbs; in particular "storage" implies "see storage" 
        which causes me to give you a list of the pokemons you have catched`,
    dontUnderstand: 
        `Sorry I don't understand. If you are stuck type "help" for some generel hints`
};

/*      items    */
const items = {
   food: {
        description: function(){
            return `You are in a forest. 
            There is a lot if berries, that your pokemons love`;
        },
        caught: function(itemNumber){
            return `You took ${itemNumber} berries`;
        }
   },
   pokeballs: {
        description: function(){
            return `You can't catch any pokemons without pokeballs`;
        },
        caught: function(itemNumber){
            return `You took ${itemNumber} berries`;
        }
   }
};

/*      pokemon    */
const pokemon = {
    description: function(){
        return `There is a pokemon!`;
    },
    caught: function(pokemonName){
        storage.push(pokemonName);
        return `You got it! It is ${pokemonName}.`;
    }
};
/*      leader    */
const leader = {
    description: function(gymLeader, pokemon){
        return `The person introduce her self as ${gymLeader}. 
        The pokemon is ${pokemon}. What will you do?`;
    },
    caught: function(gymLeader){
        return `You won over ${gymLeader}.`;
    }
};
/*      cities     */
const cityData = {
    intro: {
        name: "Pallet Town",
        battle : {},
        pokemon: {
            name: "Venonat",
            type:"Bug",
        },
        info: "Starting and home town. Calm and tranquil.",
        task: "catch pokemon",
        description: function(){
            return `You are at ${this.name} on a road. 
            In front of you is there a small brick building. 
            Around you is a forest.`;
        },
        options: ["building"]
    },
    city1: {
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
        description: function(){
            return `There is a sign with the name ${this.name}. 
            The road is splitting up. You can go to the left or right`;
        },
        options: ["left", "right", "battle leader", "back"]
    },
    city2: {
        name: "Viridian City",
        battle: {},
        pokemon: {},
        info: "City before Viridian Forest and city leading to Indigo Plateau.",
        task: "take food",
        description: function(){
            return `There is a sign with the name ${this.name}. The road is splitting up. You can go to the left or right`;
        },
        options: ["get berries", "back"]
    },
    city3: {
        name: "Cerulean City",
        battle: {
            gymLeader: "Misty",
            type: "Water",
            pokemon: "Tentacool",
            weakness: "Dragon"
        },
        pokemon: {
            name:"Dragonite",
            type:"Dragon"
        },
        info: "Water city and home of the bike shop.",
        task: "battle pokemon and catch pokemon",
        description: function(){
            return `There is a sign with the name ${this.name}. The road is splitting up. You can go to the left or right`;
        },
        options: ["battle leader", "catch pokemon", "left", "right", "back"]
    },
    city4: {
        name: "Viridian City",
        battle: {},
        pokemon: {},
        info: "Serves as a port for the S.S. Anne.",
        task: "crossroad",
        description: function(){
            return `There is a sign with the name ${this.name}. The road is splitting up. You can go to the left or right`;
        },
        options: ["left", "right", "back"]
    },
    city5: {
        name: "Lavender Town",
        battle: {},
        pokemon: {},
        info: "Known for ghost sightings, home of the Pokemon Tower and a gravesite for Pokemon.",
        task: "take pokeballs",
        description: function(){
            return `There is a sign with the name ${this.name}. The road is splitting up. You can go to the left or right`;
        },
        options: ["get pokeballs", "back"]
    },
    city5: {
        name: "Celadon City",
        battle: {
            gymLeader: "Erika",
            type: "Grass",
            pokemon: "Bellsprout",
            weakness: "Fire"
        },
        pokemon: {
            name:"Vulpix",
            type:"Fire"
        },
        info: "Most populated city in Kanto. Home to a department store and casino.",
        task: "battle leader, catch pokemon",
        description: function(){
            return `There is a sign with the name ${this.name}. The road is splitting up. You can go to the left or right`;
        },
        options: ["battle leader", "catch pokemon", "back", "left", "right"]
    },
}
/*      crossroads     */
const roadsData = {
    name: "crossroad",
    firstRoad: {
        description: function(){
            return `You are at a ${roadsData.name}, where you stand in front of a building. 
            The road is splitting up to the left and to the right. 
            The road to the right is dark and you can't see anything. 
            The road to the left is lighted up by lampposts`;
        },
    },
    secondRoad: {
        description: function(){
            return `You are at a ${roadsData.name}. 
            The road is splitting up to the left and to the right.`;
        },
    },
    options: ["left", "right"]
};
/*      roads to the left     */
const leftRoadData = {
    name: "Left Road",
    firstRoad: {
        description: function(){ //crossroad
            return `You walk to the left. 
            The road is nice you walk for a while and 
            see a new road`;
        },
        options: []
    },
    secondRoad: {
        description: function(){ //battle time
            return `You walked to the left. The road is winding.
            But you can see something in the horizons. It is a person.`;
        },
        options: ["battle"]
    },
    thirdRoad: {
        description: function(){ //catch pokemon
            return `You walked to the left. The road is a dead end.
            But you can see something moving.`;
        },
        options: ["catch"]
    }
};
/*      roads to the right     */
const rightRoadData = {
    name: "Right Road",
    firstRoad: {
        description: function(){ //catch pokemon
            return `You walked to the right. It is a long and dark road. 
            You hear something in the bushes. You stop and look over there. 
            You can hear it moving. It is everywhere. It stops. 
            You go back to the building. Suddenly something is in front of you.`;
        },
        options: ["catch"]
    },
    secondRoad: {
        description: function(){ //crossroad
            return `You walk to the right. 
            It is a nice road. The sun is shinning.
            There is a lot of flowers and animals`;
        },
        options: []
    },
    thirdRoad: {
        description: function(){ //battle
            return `You walked to the right. The road is a boring and long.
            But then you meet someone.`;
        },
        options: ["battle"]
    }
};

/*--------------------------------
        functions, so everything works
--------------------------------*/
/*  all cities  */

function city(city){ //show city
    description(cityData[city].description());
};

/*  all roads   */
function crossRoads(road){ //cross road
    route.push("crossRoad");
    description(roadsData[road].description());
};

function leftRoad(road){ //left road
    route.push("leftRoad");
    description(leftRoadData[road].description());
};

function rightRoad(road){  //right road
    route.push("rightRoad");
    description(rightRoadData[road].description());
};
//building
function roads(){
    route.push("building");
    description(roadsData.description());
};

/*  pokemon   */
function seePokemon(){  //see pokemon
    description(pokemon.description());
};

function getPokemon(city){ //catch pokemon
    description(pokemon.caught(cityData[city].pokemon.name));
};

/*  leader  */
function seeLeader(city){  //see pokemon
    description(leader.description(city[city].battle.gymleader, city[city].battle.pokemon));
};

function battleLeader(city){ //catch pokemon
    description(leader.caught(cityData[city].battle.gymLEader));
};

/*  items  */
function seeItem(item){  //see items
    description(items[item].description());
};

function takeItems(item){ //take items
    description(items[item].caught(itemNumber));
};

/*--------------------------------
        Eventlisteners
--------------------------------*/
//what does the user push on?
window.addEventListener("keyup", function(e){
    var charCode = e.keyCode; //code of numbers
    if ((charCode > 47 && charCode < 58)||(charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32) {//if you press any letters
        userLetter.push(e.key); //push inside the array
        userText.innerHTML = userLetter.join('');//make it visieble on the site
    } else if(charCode == 8){ //if you press backspace
        userLetter.splice(userLetter.length-1, 1);  //delete the numbers og arrays - 2 from behind
        return userText.innerHTML = userLetter.join(''); //make it visble on the site
    } else if(charCode == 13){  //if you press enter
        description(userLetter.join(''));
        whatToDo();
        userLetter = []; //delete the array
        userText.innerHTML = ""; //upload the letters from the user on the site
    }else{
        return false;
    };
});