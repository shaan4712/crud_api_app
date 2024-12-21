const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Defining Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }

});

//run before saving data to db 
personSchema.pre('save', async function(next) {
    const person = this; //with arrow fn this wont work
    //Hash the password only if it has been modified (or it is new)
    if (!person.isModified('password')) return next();

    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash pwd
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override plain pwd with hashed pwd
        person.password = hashedPassword;

        next();      
    } 
    catch (err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch (err) {
        throw err;
    }
}

//db pwd = adjfnadfsndlkadsfasdf
//login = prince (user entered this)

//compare fn of bcrypt:
//adjfnadfsndlkadsfasdf --> extracts salt from this
//salt + prince --> adjfnadfsndlkadsfasdf

//Create Person model
const Person = mongoose.model('Person', personSchema); //isi naam se collection banega

module.exports = Person;