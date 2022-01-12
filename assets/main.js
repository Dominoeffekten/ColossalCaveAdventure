'use strict';

/*
 https://pokeapi.co/docs/v2#locations-section



 https://cdn.vox-cdn.com/thumbor/1O-7I_jI6zXa0AvC2sN3sPhOFhE=/0x0:1280x3258/1720x0/filters:focal(0x0:1280x3258):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/19375993/Pokemon_sword_shield_galar_map_locations.jpg

*/


// save keystrokes for queryseletor
const select = function (foo) { 
    return document.querySelector(foo);
}

//variables
let userLetter = []; //make a variable with the user letters

//get elements
let cursor = select(".fa-square-full"); //get square
let userText = select(".userText"); //get the p for the user text
let placeText = select(".placeTextHere"); //get the p for the user text




//what does the user push on?
window.addEventListener("keyup", function(e){
    
    var charCode = e.keyCode;
    console.log(charCode);
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 32) {
        userLetter.push(e.key);
        console.log(userLetter);
        userText.innerHTML = userLetter.join('');
    } else if(charCode == 8){
        userLetter.splice(userLetter.length-1, 1);
        console.log(userLetter);
        userText.innerHTML = userLetter.join('');
    }else if(charCode == 13){
        placeText.innerHTML += userLetter.join('');
        userLetter = [];
        userText.innerHTML = userLetter;
    }else{
        return false;
    };
});

//get the cursor to blink
setInterval(function() {
    cursor.classList.toggle("blink");
}, 600);




