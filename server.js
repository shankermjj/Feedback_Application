const express = require('express'); 
const bodyParser = require('body-parser'); 
const path = require('path');
const { MongoClient } = require("mongodb");
const app = express(); 
const PORT = 3000; 
 
// Middleware to parse URL-encoded bodies 
app.use(bodyParser.urlencoded({ extended: true })); 

//Loads all HTML Files & CSS Files
app.use(express.static(__dirname + '/html'))

//Load JS Files
app.get('/html/js/basic.js',function(req,res){
    res.sendFile(path.join(__dirname + '/html/js/basic.js')); 
});

// Serve the HTML form in local host
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/html/index.html'); // Make sure to adjust the path if necessary 
}); 


// MongoDB connection details
const url = "mongodb://localhost:27017"; // Replace with your MongoDB connection string
const client = new MongoClient(url);
const dbName = "college1";
const collectionName = "student1";

// Middleware to parse JSON
app.use(express.json());

//POST Method Invoking on FORM TAG in HTML
app.post('/shanker', async(req, res) => { 
    const name = req.body.name; // Access the form value 
    const rollno =req.body.rollno;
    console.log(`Received name: ${name}`); 
    console.log(`Received rollno: ${rollno}`); 
    const Subject =req.body.subject;
    const feedback =req.body.op;
    console.log(`Recieved Feedback ${feedback}`);
    const suggessions =req.body.feedback;

    const Rating = calc(feedback);
    console.log(`Rating with Feedback ${Rating}`);
    
       try {
      
      if (!name || !rollno || !feedback || !Subject || !suggessions) {
        return res.status(400).json({ error: "Missing required fields: name, rollno, Subject,Rating, feedback, suggessions.. " });
      }
  
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      
      //const Rating=5;
     // capturing Rating
      const result = await collection.insertOne({ name, rollno, Subject,Rating, feedback,suggessions });
      res.status(201).json({
        message: "Your Feedback is successfully inserted\n",
        sucess: "Thanks for your Valuable Feedback...\n",
        insertedId: result.insertedId,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to insert student", details: err.message });
    } finally {
      await client.close();
    }
});

// GET: Retrieve all documents from the collection in shanker1 URL
app.get("/shanker1", async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
  
      const students = await collection.find({}).toArray();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve students", details: err.message });
    } finally {
      await client.close();
    }
  });

//Javscript code called function to exectute calc() to find rating
function calc(feedback){
  if(feedback=="Excellent"){
    return 5;
  }
  if(feedback=="Very Good"){
    return 4;
  }
  if(feedback=="Good"){
    return 3;
  }
  if(feedback=="Average"){
    return 2;
  }
  if(feedback=="Below Average"){
    return 1;
  }
  if(feedback=="Not Bad"){
    return 0;
  }
}

// Start the server 
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); 
}); 