const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
title: {
  type: String,
  required: true,
},
summary: {
  type: String,
  required: true
},
image:{
  type: String
},
description: {
  type: String
}

});

module.exports = mongoose.model('post',postSchema);