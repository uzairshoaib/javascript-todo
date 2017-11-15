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
		document.getElementById('addTodo').addEventListener('click', addTodoHandler);
		function addTodoHandler() {
			var description = document.getElementById('input-description').value;
			App.addTodo(description);
		}
	}

	function addTodoToList(todoId, description) {
		var todoRow = document.createElement('tr');
		todoRow.innerHTML = '<td rel="todo-desc">'+description+'</td><td><button data-todoid="'+todoId+'" class="btn btn-default" rel="action-on-todo"><span class="fa fa-trash"></span></button><button data-todoid="'+todoId+'" class="btn btn-default" rel="action-on-todo"><span class="fa fa-pencil"></span></button></td><td><button data-todoid="'+todoId+'" class="btn btn-default" rel="action-on-todo"><span class="fa fa-"></span></button></td>';
		todosList.append(todoRow);
	}
}

})();