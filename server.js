const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
//received data from body 
app.use(express.json());


// TODO:MONGODB CONNECTION
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.adtiy4p.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run(){
    try{
        await client.connect();

        const serviceCollection =client.db('medic_world').collection("services")

        app.get("/service", async(req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            // console.log("services",services);
            res.send(services);
        })


    }

    finally{

    }
  }
  run().catch(console.dir);






  app.get("/", async (req, res) => {
    res.send(`hello from medic world: ${port}`);
  });
  

app.listen(port, () => {
  console.log(`runing medic world server on ${port} port`)
});