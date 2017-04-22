var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.

    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      // Case 1: If everything's true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      //Case 2: If everthing is false, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';
      var toggleCompletedButton = this.createToggleCompletedButton();
      var incomplete = " fa fa-square-o";
      var complete = " fa fa-check";
      if (todo.completed === true) {
        toggleCompletedButton.className += complete;
        todoTextWithCompletion = todo.todoText;
      } else {
        todoTextWithCompletion = todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.insertBefore(toggleCompletedButton, todoLi.firstChild);
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggleCompletedButton: function() {
    var toggleCompletedButton = document.createElement('button');
    toggleCompletedButton.className = 'toggleCompletedButton';
    toggleCompletedButton.id = 'toggleCompletedButton';
    return toggleCompletedButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on.
      var elementClicked = event.target;

      // Check if element clicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.id === 'toggleCompletedButton') {
        handlers.toggleCompleted(elementClicked.parentNode.id);
      }
    });
  }
};

view.setUpEventListeners();


function handleKeyPress(e) {
  var key = e.keyCode || e.which;
    if (key==13) {
      handlers.addTodo();
    }
}

function itemsRemainingCounter() {
  var itemCount = todoList.todos.length - todoList.toggleAll.todosCompleted;
  var updateNumber = document.getElementById('itemsRemainingCounter');
  updateNumber.textContent = itemCount + " items remaining";

}

// function toggleColorOfToggleAll() {
//   var toggleCompleted = document.getElementById('test');
//   toggleCompleted.addEventListener('click', function() {
//     if (todoList.todo.completed == false) {
//       button.addList.add(.toggleAllCompleted);
//     } else {
//       button.addList.remove(.toggleAllCompleted);
//     }
//   });
// }
//
