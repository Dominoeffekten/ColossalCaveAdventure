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
let storage = ["Pikachue"]; // pokemons in storgae

//get elements
let cursor = select(".fa-square-full"); //get square
let userText = select(".userText"); //get the p for the user text
let placeText = select(".placeTextHere"); //get the place for the user text

let pokemonNumber = 0; //number og pokemons
let berryNumber; //number og berries
let takeBerry = 0;

let option = 0; //the options the user has taken
let route = []; //which rout the user are one

/*--------------------------------
        Do function
--------------------------------*/

function whatToDo(){
    let userAnswear = userLetter.join(''); //user answear
    if (userAnswear.toLowerCase() === "back") { //if the answear is back
        let lastVisit = route.length - 1; //go to last visit place
        let globalNameRoad = route[lastVisit].split(" ")[0]; //go inside switch
        let nameOfRoute = route[lastVisit].split(" ")[1]; //firstRightRoad
        switch (globalNameRoad) {
            case "crossroad":
                city(nameOfRoute);
                break;
            case "leftRoad":
                crossRoads(nameOfRoute);
                break;
            case "rightRoad":
                crossRoads(nameOfRoute);
                break;
            default:
                break;
        };
        route.splice(-1); // remove last index of array
        option--; //minus one option
    } else {
        if(userAnswear == "help"){ //help
            description(instructionData.help);
        } else if(userAnswear == "storage"){ //storage
            for(let i = 0; i <= storage.length-1; i++){
                description(storage[i]);
            };
        } else if(userAnswear == "yes" && option == 0){ //instruction yes
            description(instructionData.instruction); 
            city("introCity"); //first city
            option++; //1
        } else if(userAnswear == "no" && option == 0){ //instruction no
            city("introCity"); //first city
            option++; //1
        } else if(userAnswear == "building" && option == 1){
            crossRoads("road1"); //go to crossroads
            option++; //2
        } else if(userAnswear == "right"){ //right
            if (option == 2){
                rightRoad("road1"); //--> catch pokemon (intro))
                option++; //3
                seePokemon("intro"); //venonat
            } else if (option == 3){
                rightRoad("road2"); //--> new city (city2)
                city("city2");
                seeItem("food");
                option++; //4
            } else if (option == 5){
                rightRoad("road3"); //--> battle leader (city3)
                seeLeader("city3"); //city4
                option++; //6
            } else if (option == 6){
                rightRoad("road4");
                seePokemon("city6"); //vulpix (city6)
                option++; //7
            } else if (option == 7){
                rightRoad("road5"); //--> new city (city6)
                city("city7"); //city7
                option++; //8
            } else if (option == 8){
                rightRoad("road6"); //--> battle leader (city7)
                seeLeader("city7"); //battle leader
                option++; //9
            }else{
                description(instructionData.dontUnderstand);
            }; 
        } else if(userAnswear == "left"){ //right
            if (option == 2){
                leftRoad("road1");  //--> new city (city 1)
                city("city1");
                option++; // 3
            } else if (option == 3){
                leftRoad("road2");  //--> battle leader (city 1)
                seeLeader("city1");
                option++; //4
            } else if (option == 5){
                leftRoad("road3");  //--> catch pokemon (dragonnite)
                seePokemon("city3")//Dragonite
                option++; //6
            } else if (option == 6){
                leftRoad("road4");  //--> catch pokeballs (city5)
                seeItem("pokeballs");
                option++; //7
            } else if (option == 7){
                leftRoad("road5");  //--> catch pokemon (city6 vulpix)
                seeLeader("city6")//battle
                option++; //8
            } else if (option == 8){
                leftRoad("road6");  //--> new city (city8)
                seePokemon("city8");//jynx
                option++; //9
            } else if (option == 9){
                if(storage.length = 5){
                    leftRoad("final");  //--> new city (final)
                    option++; //8
                }else{
                   description(`You have forgotten a pokemon. Find it and come back`);
                }
            } else{
                description(instructionData.dontUnderstand);
            }; 
        } else if(userAnswear == "catch pokemon"){//catch pokemon
            if(option == 3){
                getPokemon("introCity"); //venonat
                option++;
            } else if(option == 6){
                getPokemon("city3"); //Dragonite
            }else if(option == 7){
                getPokemon("city6"); //vulpix
                city("city6");
            } else{
                description(instructionData.dontUnderstand);
            };
        } else if(userAnswear == "battle leader"){//catch pokemon
            if(option == 4 && storage[1] == "Venonat"){
                battleLeader("city1"); //city 1
                city("city2"); //new city
                seeItem("food"); //food
                option++; //5
            }else if(option == 6 && storage[2] == "Dragonite"){//fix
                console.log("dragonnite");
                city("city4");
            }else if(option == 8 && storage[3] == "Vulpix"){
                console.log("vulpix");
                leftRoad("road5");
            }else if(option == 9 && storage[4] == "Jynx"){
                console.log("Jynx");
                city("city8");
            }else if (option == 4 && storage.length < 2){
                description("Your pokemon is not strong enough. You lost");
                crossRoads("road1");
                option = 1;
            } else{
                description(instructionData.dontUnderstand);
            }
        } else if(userAnswear.split(" ")[0] == "get" /*&& option == 4*/){//get berries
            //city 2 --> new city3
            let req = /[0-9]/; //checks for numbers
            
            if(req.test(userAnswear)){
                let berries = userAnswear.split(" ")[1];
                for (let i = 0; i < berries; i++) { 
                    description(`You took ${i +1} berries`);
                };
                city("city3");
            }else{
                while (true) {
                    description(`You took one berries`);
                }
            }
            
        }else{
            description(instructionData.dontUnderstand);
        };
    };
    console.log(option);
    console.log(route);
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
            return `The forest is full of bushes 
            where there are lots of berries.
            It is berries that your pokemons love`;
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
        return `The person introduce her self as battle leader ${gymLeader}. 
        The pokemon is ${pokemon}. What will you do?`;
    },
    caught: function(gymLeader){
        return `You won over ${gymLeader}.`;
    }
};
/*      cities     */
const cityData = {
    introCity: {
        name: "Pallet Town",
        battle : {},
        pokemon: {
            name: "Venonat",
            type:"Bug",
        },
        info: "Starting and home town. Calm and tranquil.",
        description: function(){
            return `You are at ${this.name} on a road. 
            In front of you is there a small brick building. 
            Around you is a forest.`;
        },
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
        description: function(){
            return `There is a sign with the name ${this.name}. 
            The road is splitting up. You can go to the left or right`;
        },
    },
    city2: {
        name: "Viridian forest",
        battle: {},
        pokemon: {},
        info: "City before Viridian Forest and city leading to Indigo Plateau.",
        description: function(){
            return `There is a sign with the name ${this.name}. 
            It is the forest before Indigo Plateau.`;
        },
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
        description: function(){
            return `The city name is ${this.name}.
            It is the water city and home of the bike shop.`;
        },
    },
    city4: {
        name: "Viridian City",
        battle: {},
        pokemon: {},
        info: "Serves as a port for the S.S. Anne.",
        description: function(){
            return `You have come to a crossroad at ${this.name}. 
            The road is splitting up. You can go to the left or right`;
        },
    },
    city5: {
        name: "Lavender Town",
        battle: {},
        pokemon: {},
        info: "Known for ghost sightings, home of the Pokemon Tower and a gravesite for Pokemon.",
        task: "take pokeballs",
        description: function(){
            return `There is a sign with the name ${this.name}. 
            The road is splitting up. You can go to the left or right`;
        },
    },
    city6: {
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
        description: function(){
            return `Most populated city in Kanto; ${this.name}. 
            Home to a department store and casino. 
            You can go to the left or right`;
        },
    },
    city7:{
        name: "Saffron City",
        battle:{
            gymLeader: "Sabrina",
            type: "Psychic",
            pokemon: "Abra",
            weakness: "Psychic"
        },
        pokemon: {},
        info: "Second biggest city in terms of population. Along with Cerulean, the only city that has four routes into it.",
        task: ["battle leader", "left", "right", "back"]
    },
    city8:{
        name: "Fuchsia City",
        battle: {},
        pokemon:{
            name: "Jynx",
            type:"Psychic"
        },
        info: "Home to the Safari Zone which has since been replaced with the Go Park.",
    },
    final:{
        name: "Indigo Plateau",
        battle: {},
        pokemon: {},
        info: "Capital of the Pokemon League.", 
    }
}
/*      crossroads     */
const roadsData = {
    name: "crossroad",
    road1: {
        description: function(){
            return `You are at a ${roadsData.name}, where you stand in front of a building. 
            The road is splitting up to the left and to the right. 
            The road to the right is dark and you can't see anything. 
            The road to the left is lighted up by lampposts`;
        },
    },
    road2: {
        description: function(){
            return `You are at a ${roadsData.name}. 
            The road is splitting up to the left and to the right.`;
        },
    },
};
/*      roads to the left     */
const leftRoadData = {
    name: "Left Road",
    road1: {
        description: function(){ //crossroad
            return `You walk to the left. 
            The road is nice you walk for a while and 
            see a new road`;
        },
    },
    road2: {
        description: function(){ //battle time
            return `You walked to the left. The road is winding.
            But you can see something in the horizons. It is a person.`;
        },
    },
    road3: {
        description: function(){ //catch pokemon
            return `You walked to the left. The road is a dead end.
            But you can see something moving.`;
        }
    },
    road4: {
        description: function(){ //catch pokemon
            return `You walked to the left. You see a flower field
            where you something is hidding.
            It is pokeballs`;
        }
    },
    road5: {
        description: function(){ //catch pokemon
            return `You are meet by a dead end.
            But in the corner there is something.`;
        }
    },
    road6: {
        description: function(){ //catch pokemon
            return `the road is steep, and it is hard to walk.`;
        },
    },
    final: {
        description: function(){ //catch pokemon
            return `You are walking to the end of the moutain.
            You can see over all the cities, where you have won over
             the leaders and catched all the pokemons.
            But you are ready for new adventures.`;
        },
        options: []
    }
};
/*      roads to the right     */
const rightRoadData = {
    name: "Right Road",
    road1: {
        description: function(){ //catch pokemon
            return `You walked to the right. It is a long and dark road. 
            You hear something in the bushes. You stop and look over there. 
            You can hear it moving. It is everywhere. It stops. 
            You go back to the building. Suddenly something is in front of you.`;
        },
    },
    road2: {
        description: function(){ //crossroad
            return `You walk to the right. 
            It is a nice road. The sun is shinning.
            There is a lot of flowers and animals`;
        },
    },
    road3: {
        description: function(){ //battle
            return `You walked to the right. The road is a boring and long.
            But then you meet someone.`;
        },
    },
    road4: {
        description: function(){ //battle
            return `The right road is nice, but leads to another city.`;
        },
    },
    road5: {
        description: function(){ //battle
            return `There is a sign, which leads you
             to another city.`;
        },
    },
    road5: {
        description: function(){ //battle
            return `Another road, another city`;
        },
    }
};

/*--------------------------------
        functions, so everything works
--------------------------------*/
/*  all cities  */

function city(city){ //show city
    route.push(city); //building
    description(cityData[city].description());
};

/*  all roads   */
function crossRoads(road){ //cross road
    route.push("crossroad " + road);
    description(roadsData[road].description());
};

function leftRoad(road){ //left road
    route.push("leftRoad "+road);
    description(leftRoadData[road].description());
};

function rightRoad(road){  //right road
    route.push("rightRoad "+road);
    description(rightRoadData[road].description());
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
    console.log()
    description(leader.description(cityData[city].battle.gymLeader, cityData[city].battle.pokemon));
};

function battleLeader(city){ //catch pokemon
    description(leader.caught(cityData[city].battle.gymLeader));
};

/*  items  */
function seeItem(item){  //see items
    description(items[item].description());
};

function takeItems(item){ //take items
    description(items[item].caught(itemNumber));
};

//go back
function goBack(){
    let lastVisit = route.length - 1; //go to last visit place
        let globalNameRoad = route[lastVisit].split(" ")[0]; //go inside switch
        let nameOfRoute = route[lastVisit].split(" ")[1]; //firstRightRoad
        switch (globalNameRoad) {
            case "crossroad":
                city(nameOfRoute);
                break;
            case "leftRoad":
                crossRoads(nameOfRoute);
                break;
            case "rightRoad":
                crossRoads(nameOfRoute);
                break;
            default:
                break;
        };
        route.splice(-1); // remove last index of array
        option--; //minus one option
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