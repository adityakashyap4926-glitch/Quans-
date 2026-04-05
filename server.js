const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const API_KEY = "PASTE_YOUR_OPENAI_API_KEY_HERE";

app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userMsg }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.json({ reply: "Error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});