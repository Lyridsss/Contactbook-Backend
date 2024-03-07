const Contact = require("../models/contact.model")
const ApiError = require("../api-error")

exports.create = (data) => {
    return Contact.create(data);
}

exports.findAll = () => {
    return Contact.find({})
}

exports.findOne = (contactId) => {
    return Contact.findById(contactId)

}

exports.update = (contactId, data) => {
    return Contact.updateOne({ _id: contactId }, data)
}

exports.delete = (contactId) => {
    return Contact.findByIdAndDelete(contactId)
}

exports.deleteAll = () => {
    return Contact.deleteMany({})
}

exports.findAllFavorite = () => {
    return Contact.find({
        favorite: true
    })
}