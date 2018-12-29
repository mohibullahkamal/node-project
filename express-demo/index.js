const Joi = require('joi');   // makes input validation easy...
const express = require('express');
const app = express();

app.use(express.json());   // allows for Json parsing... not set by default by express... we need it to parse the request below... here-->  "name: req.body.name"

// our data set array... 
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' },
];


// let homeCount = 1;
// app.get('/', (req, res) => {   // This is how we define a route... we specify the url/path and then a callback function also called a route handler... 
//     res.send('Hello From Home...');
//     console.log('Home...count = ' + homeCount);
//     return homeCount++;
// });

// let apiCount = 1;
// app.get('/api/courses', (req, res) => {
//     res.send('Hello from api/courses...');
//     console.log('Api... count = ' + apiCount);
//     return apiCount++;
// });

// // How to get "/api/courses/1"; ":" is used to set a parameter... in this case id
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);   // you basically can read the url id... just imagine what power it gives you... 
// });

// // now look at this... we can basically provide all info in url... cool... /api/posts/2018/February...
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

// // but how to read "Query String Parameters"... here is how... same as above but minute change... 
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query);   // Now our app can read query from url... eg: http://localhost:3000/api/posts/3000/March?sortBy=name  ... in this case {sortBy: "name"}
// });

// // Now after setting the courses array above... lets get all courses...
// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });

// // Lets now set id for courses to get... a bit complicated though... Naaa its easy... 
// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));   // look above what params.id does... set the following to 'const course'; and also parse the req info // courses.find is a method available to every JS array, it takes an argument... in order for the comparison to properly we are converting; as in parsing it...  
//     if (!course) res.status(404).send('The course with the given ID was not found... ');    // check for error... blablabla.send .... always have a .send
//     res.send(course);    //else just send(course)
// });

// // This is Post request... I had to set app.get(express.json) .... above.. 
// app.post('/api/courses', (req, res) => {
//     const course = {
//         id: courses.length + 1,   // we add 1 simple
//         name: req.body.name   // we use -> app.use(express.json()) parsing above... 
//     };
//     courses.push(course);   // we push the newly added course object... 
//     res.send(course);   // convention that db notifies to which id was added... 
// });

// we set input validator... copy of above... plus the input validator... 
app.post('/api/courses', (req, res) => {
    // we define schema of our object...
    const schema = {
        name: Joi.string().min(3).required()
    }

    Joi.validate(req.body, schema);

    if (!req.body.name || req.body.name.length < 3) {   // never trust data sent from client... 
        // 400 Bad Request... 
        res.status(400).send('Name is required and should be more than 3 characters.');
        return;
    }
    const course = {
        id: courses.length + 1,   // we add 1 simple
        name: req.body.name   // we use -> app.use(express.json()) parsing above... 
    };
    courses.push(course);   // we push the newly added course object... 
    res.send(course);   // convention that db notifies to which id was added... 
});




// PORT - it is unlikely that our hosting port will be 3000... therefore to set it dynamically we use this process.env method... 
const port = process.env.PORT || 3000;
app.listen(port, () => {   // we set a listener... 
    console.log(`Listening on PORT ${port}...`);
});