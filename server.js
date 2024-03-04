// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate-image', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            })
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        const responseData = await response.json();
        const imageUrl = responseData.data[0].url;

        // Respond with the URL of the generated image
        res.json({ imageUrl });

    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generating image' });
    }
});

app.listen(PORT, () => console.log(`Image generation service running on port ${PORT}`));
