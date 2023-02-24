import { createDemo } from "./demo.js";
import { sanitizeInput } from "./prevent_codeInjec.js";
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let statusInput = form.status;
console.log(form.status.value)
let msg = document.getElementById("msg");
// conteneur des tâches
let tasks = document.getElementById("tasks");
// conteneur des tâches archivées
let archive = document.getElementById("task-complete")
let add = document.getElementById("add");
let yesDelete = document.getElementById("yesDelete")





// Validation formulaire (ne peut pas être vide)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        // fermer automatiquement le modal
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};
// Stocker les données (en local)
let data = [];

let acceptData = () => {
    data.push({
        text: sanitizeInput(textInput.value),
        date: sanitizeInput(dateInput.value),
        description: sanitizeInput(textarea.value),
        status: sanitizeInput(statusInput.value),
    });

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    archive.innerHTML = "";
    data.map((x, y) => {
        if (x.status === "En-cours") {
            tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
              <i id="isDone" onClick="done(this)"><img src="./src/img/1936474.png" alt="done-icon"></i>
            </span>
          </div>
      `;
            return tasks;


        } else if (x.status === "Terminée") {
            archive.innerHTML += `<div id=${y}>
       <span class="fw-bold">${x.text}</span>
       <span class="small text-secondary">${x.date}</span>
       <p>${x.description}</p>

     </div>
 `} return archive;

    });

    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};
// DELETE TASKS
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
}

// EDIT TASKS
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};



let deleteAll = () => {
    localStorage.clear();
    data = [];
    createTasks();
    yesDelete.setAttribute("data-bs-dismiss", "modal");
        yesDelete.click();
        (() => {
            yesDelete.setAttribute("data-bs-dismiss", "");
        })();


}

yesDelete.addEventListener("click", deleteAll);

// CREATE A BUTTON DISPLAYING A DEMO OF A NOTE

// let demo = [
//     {
//         "text": "RDV",
//         "date": "25/02/2023",
//         "description": "Dîner au nautique",
//         "status": "En-cours"
//     },
//     {
//         "text": "Commission",
//         "date": "24/02/2023",
//         "description": "Aller au fleuriste acheter des fleurs pour rdv",
//         "status": "En-cours"
//     }
// ]

// function createDemo(e) {
//     data.splice(0, data.length, ...demo);
//     localStorage.setItem("data", JSON.stringify(demo))
//     createTasks();
// }


demoBtn.addEventListener("click", (e) => {
    createDemo(data);
    createTasks();
});


// STORE DATA ET POSTE
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);

    createTasks();
})();



// REGLE LES ID 


