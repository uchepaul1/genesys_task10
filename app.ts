interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
    dueDate: Date;
}

class TodoList {
    private todos: TodoItem[] = [];
    private nextId: number = 1;

    addTodo(task: string, dueDate: Date = new Date()): TodoItem {
        if (!task || task.trim() === '') {
            throw new Error('Task cannot be empty');
        }

        const newTodo: TodoItem = {
            id: this.nextId++,
            task: task.trim(),
            completed: false,
            dueDate
        };

        this.todos.push(newTodo);
        return newTodo;
    }

    completeTodo(id: number): TodoItem | undefined {
        const todo = this.findTodoById(id);
        
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        todo.completed = true;
        return todo;
    }

    removeTodo(id: number): boolean {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => todo.id !== id);
        
        return this.todos.length !== initialLength;
    }

    listTodos(): TodoItem[] {
        return [...this.todos];
    }

    filterByStatus(completed: boolean): TodoItem[] {
        return this.todos.filter(todo => todo.completed === completed);
    }

    updateTaskDescription(id: number, newTask: string): TodoItem | undefined {
        if (!newTask || newTask.trim() === '') {
            throw new Error('Task cannot be empty');
        }

        const todo = this.findTodoById(id);
        
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        todo.task = newTask.trim();
        return todo;
    }

    updateDueDate(id: number, newDueDate: Date): TodoItem | undefined {
        const todo = this.findTodoById(id);
        
        if (!todo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        todo.dueDate = newDueDate;
        return todo;
    }

    clearCompleted(): number {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => !todo.completed);
        
        return initialLength - this.todos.length;
    }

    private findTodoById(id: number): TodoItem | undefined {
        return this.todos.find(todo => todo.id === id);
    }
}

function formatDateTime(date: Date): string {
    return `${date.getUTCFullYear()}-${
        String(date.getUTCMonth() + 1).padStart(2, '0')}-${
        String(date.getUTCDate()).padStart(2, '0')} ${
        String(date.getUTCHours()).padStart(2, '0')}:${
        String(date.getUTCMinutes()).padStart(2, '0')}:${
        String(date.getUTCSeconds()).padStart(2, '0')}`;
}

function demoTodoList() {
    const todoList = new TodoList();
    
    try {
        const currentDateTime = new Date();
        console.log(`Current Date and Time (UTC): ${formatDateTime(currentDateTime)}`);
        console.log(`User: Demo User\n`);

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
        const removedCount = todoList.clearCompleted();
        console.log(`Removed ${removedCount} completed todo(s)`);
        
        console.log("\nFinal todo list:");
        console.log(todoList.listTodos());
        
    } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : String(error));
    }
}

demoTodoList();