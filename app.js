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
		deleteTodo: deleteTodo,
		completeTodo: completeTodo,
		filterTodos: filterTodos,
	}

	return publicAPI;

	// todo stuff

	// add todo 
	function addTodo(description) {
		if(Helpers.validateEntry(description)){
			var todoId = todos.length++;
			todos[todoId] = {
				description: description,
				status: 0,
			}
			UI.addTodoToList(todoId, description);	
			return todos[todoId];
		} else {
			alert('Description must be equals to or greater than '+Helpers.minDescriptionLength+' characters');
		}
	}

	// delete todo from data
	function deleteTodo(todoId) {
		todos.splice(todoId,1);
	}
	
	// change todo status  
	function completeTodo(todoId) {
		todos[todoId].status = 1;
	}

	// filter todos
	function filterTodos(todoStatus = '*'){
		var filteredTodos = todos;
		if(todoStatus != '*'){
			filteredTodos = filteredTodos.filter(function(todo){
				return todo.status === Number(todoStatus);
			});
		}
		return filteredTodos;
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
		// set filters handler
		var filterTodos = document.querySelectorAll('.filter-todos');
		filterTodos.forEach(function(filterTodo, i){
			filterTodo.addEventListener('click', filterTodosHandler);
		})

		// add Todo Handler
		function addTodoHandler() {
			var description = document.getElementById('input-description');
			App.addTodo(description.value);

			description.value = '';
			description.focus();
		}

		// filter todo Handler
		function filterTodosHandler() {
			var todoStatus = this.getAttribute('data-filter');
			var todos = App.filterTodos(todoStatus);
			filterTodosList(todos);
		}
	}

	// add todo row to dom
	function addTodoToList(todoId, description, status = 0) {
		var todoRow = document.createElement('tr');
		todoRow.id = 'todo-'+todoId;
		todoRow.className = (status === 1) ? 'todo-completed alert-success' : '';
		todoRow.innerHTML = '<td><button data-todoid="'+todoId+'" class="btn btn-default complete-todo" rel="action-on-todo"><span class="fa fa-check"></span></button></td><td rel="todo-desc">'+description+'</td><td><button data-todoid="'+todoId+'" class="btn btn-default delete-todo" rel="action-on-todo" id="delete-todo"><span class="fa fa-trash"></span></button></td>';
		todosList.append(todoRow);

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

	// filter todos list in dom
	function filterTodosList(todos) {
		todosList.innerHTML = '';
		todos.forEach(function(todo, i){
			addTodoToList(i, todo.description,todo.status);
		});
	}

	// deleteTodo Handler
	function deleteTodoHandler() {
		var todoId = this.getAttribute('data-todoid');
		App.deleteTodo(todoId);
		document.getElementById('todo-'+todoId).remove();
	}

	// completeTodo Handler
	function completeTodoHandler() {
		var todoId = this.getAttribute('data-todoid');
		App.completeTodo(todoId);
		document.getElementById('todo-'+todoId).className = 'alert-success todo-completed';
	}
}

App.addTodo('Development');
App.addTodo('Testing');
App.addTodo('Designing');
App.addTodo('Social Media');
App.addTodo('Marketing');

})();