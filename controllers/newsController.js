const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Create news route
exports.createNews = async (req, res) => {
  // Get the news data from the request body
  const { heading, summary, content, date, image } = req.body;

  // Create a new news object
  const newNews = new News({
    heading,
    summary,
    content,
    date,
    image,
  });

  // Save the new news object
  await newNews.save();

  // Return success response
  res.status(201).json({ message: 'News created successfully', news: newNews });
};

// Get news route
exports.getNews= async (req, res) => {
  // Find all news
  const news = await News.find();

  // Return success response
  res.status(200).json({ message: 'News retrieved successfully', news });
};

// Update news route
exports.editNews= async (req, res) => {
  // Get the news id from the request params
  const { id } = req.params;

  // Get the news data from the request body
  const { heading, summary, content, date, image } = req.body;

  // Update the news object
  const updatedNews = await News.findByIdAndUpdate(id, {
    heading,
    summary,
    content,
    date,
    image,
  });

  // Return success response
  res.status(200).json({ message: 'News updated successfully', news: updatedNews });
};

// Delete news route
exports.deleteNews=async (req, res) => {
  // Get the news id from the request params
  const { id } = req.params;

  // Delete the news object
  await News.findByIdAndDelete(id);

  // Return success response
  res.status(200).json({ message: 'News deleted successfully' });
};

