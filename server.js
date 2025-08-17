const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 10000;

// מאפשר לשרת לקרוא JSON שנשלח בבקשה
app.use(bodyParser.json());

// בדיקת שהשרת חי
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});

// נתיב לחיפוש
app.post("/google_search", (req, res) => {
  const query = req.body.query;

  if (!query) {
    return res.json({
      success: false,
      message: "❌ לא נשלח פרמטר 'query' בבקשה"
    });
  }

  // כאן בהמשך תכניס את החיפוש האמיתי
  res.json({
    success: true,
    message: `🔎 חיפשת: ${query}`,
    results: []
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
