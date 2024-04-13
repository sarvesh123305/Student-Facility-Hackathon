const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: String,
},
{
    collection: "Image"
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
