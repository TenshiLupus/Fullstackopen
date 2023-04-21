const mongoose = require('mongoose')

if(process.argv < 3){
    console.log("ERROR: Plesase include Password in the arguments")
    process.exit()
}

const password = process.argv[2]
 
const url = `mongodb+srv://Angel__CM:${password}@cluster0.2psahxk.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String, 
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3){
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name,
        number,
    })

    person.save().then(result => {
        console.log("Added ", result.name, " number ", result.number, " to phonebook")
        mongoose.connection.close()
    })
    
}else{
    Person.find({}).then(persons => {
        console.log("Phonebook:\n")
        persons.forEach(person => console.log(person.name," ", person.number,"\n"))
        mongoose.connection.close()
    })
}


