const express = require("express");
const router = express.Router();
const cars = require("../models/carSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {marque,modele,matricule,prix} = req.body;

    if(!marque || !modele || !matricule || !prix ){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await cars.findOne({matricule:matricule});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const addcar = new cars({
                marque,modele,matricule,prix
            });

            await addcar.save();
            res.status(201).json(addcar);
            console.log(addcar);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


router.get("/getallcars", async(req,res) =>{
    try {
         const cardata = await cars.find();
         res.status(201).json(cardata)
         console.log(cardata);
      } catch (error) {
        res.status(422).json(error);
    }
 })


 router.get("/getcar/:id", async (req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const carindividual = await cars.findById({_id:id});
        console.log(carindividual);
        res.status(201).json(carindividual)

     }catch (error){
        res.status(422).json(error)

     }
 })

 router.patch("/updatecar/:id", async(req,res)=>{
 try{
     const {id} = req.params;
     const updatedcar = await cars.findByIdAndUpdate(id,req.body,{
         new:true
     });

     console.log(updatedcar);
     res.status(201).json(updatedcar);

     } catch (error) {
     res.status(422).json(error);

     }
 })

 router.delete("/deletecar/:id", async (req,res)=>{
    try {
        const {id} = req.params;

        const deletcar = await cars.findByIdAndDelete({_id:id})
        console.log(deletcar);
        res.status(201).json(deletcar);

    }catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;