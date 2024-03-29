import Task from "../models/task.model.js";
import mongoose from 'mongoose';

const getTasks = async (req, res) => {
    try {
      const { serverId } = req.query;
      const tasks = await Task.find({ serverId: serverId });
      res.status(200).json({ tasks });
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  };

const addTask = async (req, res) => {
    try {
        const { _id, description, userId, serverId } = req.body;

        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            description: description,
            userId: userId,
            serverId: new mongoose.Types.ObjectId(serverId),
        })

        const newTask = await task.save();
        const allTasksInServer = await Task.find({ serverId: serverId });

        res.status(200).json({ message: 'task added', task: newTask, tasks: allTasksInServer })
    } catch (err) {
        throw err;
    }
};

const updateTask = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;

        if (!id) {
            // Handle the case where the id is missing
            return res.status(400).json({ error: 'Missing id parameter' });
        }

        const updateTask = await Task.findByIdAndUpdate( { _id: id }, body);
        const allTasksInServer = await Task.find({ server: body.serverId });

        res.status(200).json({ 
            message: "Task updated",
            task: updateTask,
            tasks: allTasksInServer,
        });
    } catch (err) {
        throw err;
    }
};

const deleteTask = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;

        if (!id) {
            // Handle the case where the id is missing
            return res.status(400).json({ error: 'Missing id parameter' });
        }
        
        const deletedTask = await Task.findByIdAndDelete({ _id: id });
        const allTasksInServer = await Task.find({ server: body.serverId });

        res.status(200).json({
            message: 'Task deleted',
            task: deletedTask,
            tasks: allTasksInServer,
        });
    } catch (err) {
        throw err;
    }
};

export { getTasks, addTask, updateTask, deleteTask };