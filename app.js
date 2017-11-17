(function initTodo(){
	'use strict'

	var todos = [];

	var UI = setupUI();
	UI.init();

	var App = setupApp();


/***************** functions stuff *********************/
var Helpers = {
	minDescriptionLength: 5,
	validateEntry(description) {
		if(description.length < 5) return false;
		return true;
	}
};
function setupApp() {
	var publicAPI = {
		addTodo: addTodo,
	}

	return publicAPI;

	// todo stuff
	function addTodo(description) {
		if(Helpers.validateEntry(description)){
			var todoId = todos.length++;
			todos[todoId] = {
				description: description,
			}
			UI.addTodoToList(todoId, description);	
			return todos[todoId];
		} else {
			alert('Description must be equals to or greater than '+Helpers.minDescriptionLength+' characters');
		}
	}

	function deleteTodo(projectId) {
		todos.splice(projectId,1);
		deleteTodoFromList(projectId);
	}
}
function setupUI(argument) {
	var todosList = document.querySelector('[rel*=js-todos-list]');

	var publicAPI = {
		init: initUI,
		addTodoToList: addTodoToList
	}

	return publicAPI;

	/********** *********/
	function initUI() {
		// set add todo handlers
		document.getElementById('addTodo').addEventListener('click', addTodoHandler);

		// add Todo Handler
		function addTodoHandler() {
			var description = document.getElementById('input-description');
			App.addTodo(description.value);
			description.value = '';
			// set delete todo handlers
			var deleteTodos = document.querySelectorAll('.delete-todo');
			for (var i = 0; i < deleteTodos.length; i++) {
				deleteTodos[i].addEventListener('click', deleteTodoHandler);
			}
			// set complete todo handlers
			var completeTodos = document.querySelectorAll('.complete-todo');
			for (var i = 0; i < completeTodos.length; i++) {
				completeTodos[i].addEventListener('click', completeTodoHandler);
			}
		}

		// deleteTodo Handler
		function deleteTodoHandler() {
			var todoId = this.getAttribute('data-todoid');
			App.deleteTodo(todoId);
		}
		// completeTodo Handler
		function completeTodoHandler() {
			var todoId = this.getAttribute('data-todoid');
			App.deleteTodo(todoId);
		}

	}

	function addTodoToList(todoId, description) {
		var todoRow = document.createElement('tr');
		todoRow.id = 'todo-'+todoId;
		todoRow.innerHTML = '<td><button data-todoid="'+todoId+'" class="btn btn-default complete-todo" rel="action-on-todo"><span class="fa fa-check"></span></button></td><td rel="todo-desc">'+description+'</td><td><button data-todoid="'+todoId+'" class="btn btn-default delete-todo" rel="action-on-todo" id="delete-todo"><span class="fa fa-trash"></span></button></td>';
		todosList.append(todoRow);
	}

	function deleteTodoFromList(todoId) {
		document.getElementById('todo-'+todoId).remove();
	}
}

})();