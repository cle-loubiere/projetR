import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    activated: {type:Boolean},
    email: {type:String, match:/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(umontpellier)\.com$/},
    emailUniv: {type:String, required:true,/*match:/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(umontpellier)\.com$/*/},
    password: {type:String},
    dateCreated: {type:Date},
    dateLastLogin: {type:Date},
    section:{type:String},
    nom:{type:String},
    prenom:{type:String}

});

module.exports = mongoose.model('User', userSchema);