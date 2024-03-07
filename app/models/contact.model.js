const { Schema, model } = require("mongoose")

const contactSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    favorite: Boolean
})

const Contact = model("contact", contactSchema)

module.exports = Contact