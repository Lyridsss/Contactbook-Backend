const contactService = require("../services/contact.service")
const ApiError = require("../api-error")

exports.create = async (req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }
    contactService.create(req.body)
                .then(contact => {
                    res.json(contact)
                })
                .catch(() => 
                    next(new ApiError(500, "An error occurred while creating the contact"))
                )
}

exports.findAll = async (req, res, next) => {
    contactService.findAll()
                .then(contacts => {
                    res.json(contacts)
                })
                .catch(() =>
                    next(new ApiError(500, "An error occurred while retrieving contacts"))
                )
}

exports.findOne = async (req, res, next) => {
    contactService.findOne(req.params.id)
                .then(contact => {
                    res.json(contact)
                })
                .catch(() => 
                    next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`))
                )
}

exports.update = async (req, res, next) => {
    const data = req.body
    if(Object.keys(data).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    } else if (!data?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    contactService.update(req.params.id, data)
                .then(async () => {
                    const contact = await contactService.findOne(req.params.id);
                    res.json(contact)
                })
                .catch(() => 
                    next(new ApiError(500, `Error updating contact with id=${req.params.id}`))
                )
}

exports.delete = async (req, res, next) => {
    try {
        const data = await contactService.delete(req.params.id)
        if(!data){
            return next(new ApiError(404, "Contact not found"))
        }
        return res.json({
            message: "Contact was deleted successfully"
        })
    } catch (error){
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
        )
    }
}

exports.deleteAll = (req, res, next) => {
    contactService.deleteAll()
                .then(data => {
                    res.json({
                        message: `${data.deletedCount} contacts were deleted successfully`
                    })
                })
                .catch(() => 
                    next(new ApiError(500, "An error occurred while removing all contacts"))
                )
}

exports.findAllFavorite = (req, res, next) => {
    contactService.findAllFavorite()
                .then(data => {
                    res.json(data)
                })
                .catch(() => 
                    next(
                        new ApiError(500, "An error occurred while retrieving favorite contacts")
                    )
                )
}