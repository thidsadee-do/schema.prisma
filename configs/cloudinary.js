const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'thidsadee64', 
  api_key: '357494619738928', 
  api_secret: process.env.CLOUDINARY_SECRET, 
});

module.exports = cloudinary;