const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); 

// Error Handling Middleware (Optional but recommended)
const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ message: 'Error occurred' });
};

// Create event route
exports.createEvent = async (req, res) => {
  try {
    // Get the event data from the request body
    const { title, description, location, date } = req.body;

    // Create a new event object
    const newEvent = new Event({
      title,
      description,
      location,
      date,
    });

    // Save the new event object
    await newEvent.save();

    // Return success response
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    handleError(err, res);
  }
};

// Get events route
exports.getEvents = async (req, res) => {
  try {
    // Find all events
    const events = await Event.find();

    // Return success response
    res.status(200).json({ message: 'Events retrieved successfully', events });
  } catch (err) {
    handleError(err, res);
  }
};

// Update event route
exports.editEvents = async (req, res) => {
  try {
    // Get the event id from the request params
    const { id } = req.params;

    // Get the event data from the request body
    const { title, description, location, date } = req.body;

    // Update the event object
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      title,
      description,
      location,
      date,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    handleError(err, res);
  }
};

// Delete event route
exports.deleteEvents = async (req, res) => {
  try {
    // Get the event id from the request params
    const { id } = req.params;

    // Delete the event object
    await Event.findByIdAndDelete(id);

    // Return success response
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    handleError(err, res);
  }
};

