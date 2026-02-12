import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json()); // allows to parse json bodies

// defining data
const todos = [
    { id: 1, task: "Learn React API Integration", done:true},
    { id: 2, task: "Build my own API", done: true },
    { id: 3, task: "Undestand TypeScript", done: true },
    { id: 4, task: "Learn Unity 3D", done: false },
    { id: 5, task: "Learn Unity 2D", done: true },
    { id: 6, task: "Create a 2D Shooter Game", done: true },
    { id: 7, task: "Master DaVinci Resolve", done: false },
]

// get route
app.get('/api/todos', (req,res) => {
    res.json(todos)
})

// post route
app.post('/api/todos', (req,res) => {
    const newTask = {
        id: Date.now(),
        task: req.body.task,
        done: false
    }
    todos.push(newTask);
    res.json(newTask)
})

app.listen(PORT, () => {
    console.log(`API is running on https://localhost:${PORT}`)
})