const mongo = require('mongoose');

const EventSchema = new mongo.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
 const Event= mongo.model('Event',EventSchema);
 
 module.exports = Event;

