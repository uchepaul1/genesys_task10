var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
        this.nextId = 1;
    }
    TodoList.prototype.addTodo = function (task, dueDate) {
        if (dueDate === void 0) { dueDate = new Date(); }
        if (!task || task.trim() === '') {
            throw new Error('Task cannot be empty');
        }
        var newTodo = {
            id: this.nextId++,
            task: task.trim(),
            completed: false,
            dueDate: dueDate
        };
        this.todos.push(newTodo);
        return newTodo;
    };
    TodoList.prototype.completeTodo = function (id) {
        var todo = this.findTodoById(id);
        if (!todo) {
            throw new Error("Todo with id ".concat(id, " not found"));
        }
        todo.completed = true;
        return todo;
    };
    TodoList.prototype.removeTodo = function (id) {
        var initialLength = this.todos.length;
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
        return this.todos.length !== initialLength;
    };
    TodoList.prototype.listTodos = function () {
        return __spreadArray([], this.todos, true);
    };
    TodoList.prototype.filterByStatus = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoList.prototype.updateTaskDescription = function (id, newTask) {
        if (!newTask || newTask.trim() === '') {
            throw new Error('Task cannot be empty');
        }
        var todo = this.findTodoById(id);
        if (!todo) {
            throw new Error("Todo with id ".concat(id, " not found"));
        }
        todo.task = newTask.trim();
        return todo;
    };
    TodoList.prototype.updateDueDate = function (id, newDueDate) {
        var todo = this.findTodoById(id);
        if (!todo) {
            throw new Error("Todo with id ".concat(id, " not found"));
        }
        todo.dueDate = newDueDate;
        return todo;
    };
    TodoList.prototype.clearCompleted = function () {
        var initialLength = this.todos.length;
        this.todos = this.todos.filter(function (todo) { return !todo.completed; });
        return initialLength - this.todos.length;
    };
    TodoList.prototype.findTodoById = function (id) {
        return this.todos.find(function (todo) { return todo.id === id; });
    };
    return TodoList;
}());
function formatDateTime(date) {
    return "".concat(date.getUTCFullYear(), "-").concat(String(date.getUTCMonth() + 1).padStart(2, '0'), "-").concat(String(date.getUTCDate()).padStart(2, '0'), " ").concat(String(date.getUTCHours()).padStart(2, '0'), ":").concat(String(date.getUTCMinutes()).padStart(2, '0'), ":").concat(String(date.getUTCSeconds()).padStart(2, '0'));
}
function demoTodoList() {
    var todoList = new TodoList();
    try {
        var currentDateTime = new Date();
        console.log("Current Date and Time (UTC): ".concat(formatDateTime(currentDateTime)));
        console.log("User: Demo User\n");
        console.log("Adding todos...");
        todoList.addTodo("Complete TypeScript assignment");
        todoList.addTodo("Buy groceries", new Date(2025, 2, 5));
        todoList.addTodo("Go for a run", new Date(2025, 2, 3));
        console.log("\nAll todos:");
        console.log(todoList.listTodos());
        console.log("\nCompleting todo #1...");
        todoList.completeTodo(1);
        console.log("\nIncomplete todos:");
        console.log(todoList.filterByStatus(false));
        console.log("\nUpdating todo #2...");
        todoList.updateTaskDescription(2, "Buy groceries and cleaning supplies");
        console.log("\nUpdating due date for todo #3...");
        todoList.updateDueDate(3, new Date(2025, 2, 4));
        console.log("\nRemoving todo #3...");
        todoList.removeTodo(3);
        console.log("\nClearing completed todos...");
        var removedCount = todoList.clearCompleted();
        console.log("Removed ".concat(removedCount, " completed todo(s)"));
        console.log("\nFinal todo list:");
        console.log(todoList.listTodos());
    }
    catch (error) {
        console.error("Error:", error instanceof Error ? error.message : String(error));
    }
}
demoTodoList();
