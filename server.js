const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post("https://api.openai.com/v1/images/generations", {
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const imageUrl = response.data.data[0].url;

        res.json({ imageUrl });

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generating image' });
    }
});

app.listen(PORT, () => console.log(`Image generation service running on port ${PORT}`));
