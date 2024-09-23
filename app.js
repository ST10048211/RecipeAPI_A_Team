// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./firebase');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to add a recipe
app.post('/addRecipe', async (req, res) => {
  const { name, totalCalories, ingredients } = req.body;

  try {
    const recipeRef = await db.collection('recipes').add({
      name,
      totalCalories,
      ingredients
    });
    res.status(200).send({ success: true, id: recipeRef.id });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// Endpoint to get all recipes
app.get('/getRecipes', async (req, res) => {
  try {
    const snapshot = await db.collection('recipes').get();
    const recipes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
