const form = document.querySelector('#to-do-form');
const todoInput = document.querySelector('input[name="to-do-text"]');
const ul = document.querySelector('ul');
const allLis = document.querySelector('li')
const ls = JSON.parse(localStorage.getItem("todos")) || [];

for (let i = 0; i < ls.length; i++) {
    let newTodo = document.createElement("li");
    newTodo.innerText = ls[i].task;
    newTodo.isClicked = ls[i].isClicked ? true : false;
    if (newTodo.isClicked) {
      newTodo.classList.add('clicked');
    }
    ul.appendChild(newTodo);
  }

function makeToDo(text){
    const newToDo = document.createElement('li');
    newToDo.innerText = text;
    return newToDo;
};

form.addEventListener('submit', function(e){
    e.preventDefault();
    const todo = makeToDo(todoInput.value);
    ul.append(todo);
    ls.push({ task: todo.innerText, isClicked: false });
    localStorage.setItem("todos", JSON.stringify(ls));
    todoInput.value = '';
});

ul.addEventListener('click', function(e){
    e.target.classList.toggle('clicked')
    if(e.target.isClicked){
        e.target.isClicked = false;
    } 
    else if(!e.target.isClicked) {
        e.target.isClicked = true;
    }
    for (let i = 0; i < ls.length; i++) {
        if (ls[i].task === e.target.innerText) {
          ls[i].isClicked = !ls[i].isClicked;
          localStorage.setItem("todos", JSON.stringify(ls));
        }
      }
});

ul.addEventListener('dblclick', function(e){
    e.target.remove('li');
    for(let i = 0; i < ls.length; i++){
        if(ls[i].task === e.target.innerText){
            ls.splice(i, 1);
            localStorage.setItem('todos', JSON.stringify(ls))
        }
    }
});


