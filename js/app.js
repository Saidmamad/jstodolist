const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list =  document.getElementById("list");
const input =  document.getElementById("input");

// class Names 

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variable 
let LIST = [], id = 0;

// get item from local strorage 
let data = localStorage.getItem("TODO");

// check if data is not empty 
if(data) {
    LIST = JSON.parse(data); // set the id to the last one in the list
    id = LIST.length; // load the list to the user interface
    loadList(LIST);
} else {
    // if data is empty  
    LIST = [];
    id = 0;
}

// load the items to the user's interface 
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage 
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show today's date 
const options = { weekday:"long", month:"short", day:"numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);
// +


// Add to do function 
 function addToDo( toDo, id, done, trash ) {
    
    if(trash) { return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH: "";
 
    const text =    `<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                    `;

    const position  = "beforeend"; 

    list.insertAdjacentHTML(position, text);
}

// add an item to the uset the enter key
 document.addEventListener("keyup", function(event){
        if( event.keyCode == 13) {
            const toDo = input.value;

            // if the input isn;t empty 
            if(toDo) {
                addToDo(toDo, id, false, false);
                LIST.push(
                    {
                        name:toDo,
                        id:id,  
                        done:false,
                        trash:false,
                    }
                );

                // add item to local storage ( this code must be added where the list array is updated)  
                localStorage.setItem("TODO", JSON.stringify(LIST));
            }
            input.value = "";
            id++;
        }

 });

//  addToDo("Drink Coffee", 1, false, false); // uncomment to test


// complete to do 
function completeToDo (element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true ;
}

// remove to do 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically 

list.addEventListener("click", function(event){
    const element = event.target; // returned the clicked element inside the list
    const elementJob = element.attributes.job.value; // returns complete or delete

    if (elementJob == "complete" ) {
        completeToDo(element);
    }
    else if (elementJob ==  "delete"){
        removeToDo(element);
    }

    // add item to local storage ( this code must be added where the list array is updated)  
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
 