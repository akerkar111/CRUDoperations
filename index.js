const express = require('express'); //Importing express
const Joi = require('joi'); //Importing Joi
const app = express(); //Creating express Application on the App variable
app.use(express.json()); //using json file

//Giving data to the server
const Customers = [
    {title: 'Riya' , id: 1},
    {title: 'Leena' , id: 2},
    {title: 'Shweta' , id: 3},
    {title: 'Prajakta' , id: 4},
    {title: 'Shivani' , id: 5},
    {title: 'Sandhya' , id: 6}
]

//Read Request handler
//Will display the following message when url is consisting of '/'
app.get('/' , (req, res) => {
    res.send('Welcome to our Blog');
});

//display the following message when url is consisting of '/api/customers'  
app.get('/api/customers', (req, res) => {
    res.send(Customers);
});

//display the information of that Specific customer when the id of that person is mentioned
app.get('/api/customers/:id', (req, res) => {
    const customer = Customers.find( c => c.id === parseInt(req.param.id));
//If there is no such id found then it will display following message
    if(!customer)res.status(404).send('<h2>Incorrect Id</h2>');
    res.send(customer);
});


//Creating Request Handler
app.post('api/Customers', (req,res) => {
    const{ error } = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }


//Increment the customer id
const customer = {
    id: Customers.length + 1,
    title: req.body.title
};
Customers.push(customer);
res.send(customer);
});


//Update Request handler
//Updating Existing customer information
app.put('/api/customers/:id', (req, res) => {
    const customer = Customers.find(c => c.id === parseInt(req.param.id));
    if(!customer)res.status(404).send('<h2>Incorrect Id</h2>');

    const{ error } = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }

    customer.title = req.body.title;
    res.send(customer);
});


//Deleting Customer details
app.delete('api/customers/:id', (req,res) => {
    const customer = customers.find(c => c.id === parseInt(req.param.id));
    if(!customer)res.status(404).send('<h2>Incorrect Id</h2>');

    const index = Customers.indexOf(customer);
    Customers.splice(index,1);

    res.send(customer);
});


//Validating Information
function validateCustomer(customer){
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}


//Port enviroment variable
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));