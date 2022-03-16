// save keystrokes for id
const $ = function (foo) { 
    return document.getElementById(foo);
}
// save keystrokes for tagName
const tagName = function (foo) { 
    return document.getElementsByTagName(foo);
}
// save keystrokes for className
const className = function (foo) { 
    return document.getElementsByClassName(foo);
}
// save keystrokes for create element
const create = function (foo) { 
    return document.createElement(foo);
}
// save keystrokes for queryseletor
const select = function (foo) { 
    return document.querySelector(foo);
}
const selectAll = function (foo) { 
    return document.querySelectorAll(foo);
}

export { $, tagName, className, create, select, selectAll };
