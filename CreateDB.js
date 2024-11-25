const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string if different
const client = new MongoClient(url);

// Database and Collection Name
const dbName = 'college1';
const collectionName = 'student1';

async function connectToDatabase() {
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log("Connected successfully to MongoDB server");
  
      const db = client.db(dbName);
  
      // Check if the collection exists
      const collections = await db.listCollections({ name: collectionName }).toArray();
  
      if (collections.length > 0) {
        console.log(`Collection "${collectionName}" exists.`);
        
        // Fetch and display the documents in the collection
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        console.log("Documents in collection:", documents);
      } else {
        console.log(`Collection "${collectionName}" does not exist. Creating it...`);
  
        // Create the collection and insert a sample document
        const collection = db.collection(collectionName);
        const sampleDocument = 
        { name: 'Shanker', rollno: 1, Subject: 'SDC', Rating: 5, feedback :"Excellent", suggessions: "Great Faculty" };
        await collection.insertOne(sampleDocument);
  
        console.log(`Collection "${collectionName}" created with a sample document.`);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      // Close the connection
      await client.close();
      console.log("Connection to MongoDB server closed.");
    }
  }
  
  // Run the main function
  connectToDatabase().catch(console.error);
