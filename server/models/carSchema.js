const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    marque: {
        type: String
       
    },
    modele: {
        type: String
        
      
    },
    matricule: {
        type: String
    
    },
    prix: {
        type: Number
       
    }

    
});

const cars = new mongoose.model("cars",carSchema);


module.exports = cars;