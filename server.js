const app = require("./app");
const config = require("./app/config");
const mongoose = require('mongoose');

const PORT = config.app.port;
const DB_URI = config.db.uri;

mongoose
    .connect(DB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch(() => {
        console.error("Connecting to MongoDB was failed")
    })
