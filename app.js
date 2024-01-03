const express = require('express')

const app = express()

const myMiddlewareFunction = require('./middlewares/middle') 
const myMiddlewareFunction2 = require('./middlewares/middle2') 

const morgan = require('morgan')

// get, post ,put, delete 

//built in middlewaressss
app.use(express.json())

//custom middlewares
app.use(myMiddlewareFunction)
app.use(myMiddlewareFunction2)

//thirdparty middle ware

const courses = [
    {id:1, name:'javascript'},
    {id:2, name:'python'},
    {id:3, name:'ArtificialIntelligence'},
    {id:4, name:'MachineLearning'},
    {id:5, name:'nodejs'},
    {id:6, name:'expressjs'}
]

app.get('/', (req,res)=>{
    res.send('hello from aneesh')
})//read
app.get('/about', (req,res)=>{
    res.send('we create impact')
})
app.get('/contact', (req,res)=>{
    res.send('contact me @abc.com')
})

app.get('/courses', (req,res)=>{
    res.send(courses)
})

// Post request
app.post('/courses', (req,res)=>{
    console.log(req.body,'otp')
    const course ={
        id: courses.length +1,
        name :req.body.name
    }
    courses.push(course)
    res.send(course)
})// create

// put method (want to update something)
app.put('/courses/:coursename', (req,res)=>{
   let course = courses.find(course => course.name === req.params.coursename)
   if(!course)res.status(404).send('the course you are looking for doesnot exist')
   course.name = req.body.name 
   res.send(course)
})
//delete method USING STRINGS NOT RECOMENDED
// app.delete('/courses/:coursename' , (req,res)=>{
//     let UpdatedCourses = courses.filter(course => course.name !== req.params.coursename )

//     courses = UpdatedCourses

//     ResizeObserver.send(courses)
// }) we cant have two delete method with same routes

//DELETE METHOD USING ID
app.delete('/courses/:id' , (req,res)=>{
    let course = courses.find(course => course.id === parseInt(req.params.id))
    console.log(req.params,"....",course)
    if(!course)res.status(404).send('the course you are looking for doesnot exist')
 
    const index = courses.indexOf(course)

    courses.splice(index, 1)

    res.send(course)
})

// Route parameters
app.get('/courses/:coursename', (req,res)=>{
   let course = courses.find(course => course.name === req.params.coursename)
   
   if(!course)res.status(404).send('the course you are looking for doesnot exist')
   res.send(course)
})

//environment variables when in production port no is assigned dynamically as below
const port = process.env.PORT || 3030

app.listen(port, ()=> console.log('port is running on 3030'))
