const express = require("express");
const router = express.Router();
const Task = require("../models/task"); 

// Crear tarea
router.post("/create", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create a task" });
    }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the tasks" });
    }
});

// Tarea por ID
router.get("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).send({ message: "Task not found." });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem geting the task." });
    }
});

// Marcar task como completada
router.put("/markAsCompleted/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id, 
            { completed: true }, 
            { new: true }
        );
        if (!task) return res.status(404).send({ message: "Task not found." });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem marking the tasl completed" });
    }
});

// Actualizar solo el título 
router.put("/id/:_id", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).send({ message: "the title is required" });

        const task = await Task.findByIdAndUpdate(
            req.params._id, 
            { title }, 
            { new: true }
        );
        if (!task) return res.status(404).send({ message: "Task not found." });
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem updating the task." });
    }
});

// Eliminar tarea
router.delete("/id/:_id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) return res.status(404).send({ message: "Task not found." });
        res.status(200).send({ message: "Task deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "here was a problem deleting the task." });
    }
});

module.exports = router;