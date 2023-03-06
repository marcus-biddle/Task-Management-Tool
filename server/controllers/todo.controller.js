import Todo from "../models/todo.model.js";

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ todos });
    } catch (err) {
        throw err;
    }
}

const addTodo = async (req, res) => {
    try {
        const { title, description, status, limit } = req.body;

        const todo = new Todo({
            title: title,
            description: description,
            status: status,
            limit: limit,
        })

        const newTodo = await todo.save();
        const allTodos = await Todo.find();

        res.status(200).json({ message: 'todo added', todo: newTodo, todos: allTodos })
    } catch (err) {
        throw err;
    }
};

const updateTodo = async (req, res) => {
    try {
        const { params: { id }, body } = req;
        const updateTodo = await Todo.findByIdAndUpdate( { _id: id }, body);
        const allTodos = await Todo.find();

        res.status(200).json({ 
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        });
    } catch (err) {
        throw err;
    }
};

const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete( req.params.id);
        const allTodos = await Todo.find();

        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos: allTodos,
        });
    } catch (err) {
        throw err;
    }
};

export { getTodos, addTodo, updateTodo, deleteTodo };