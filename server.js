import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// 🔎 נקודת קצה לקבלת קריאה ממודול תור
app.post('/google_search', async (req, res) => {
  try {
    const { caller, digits } = req.body;
    const query = digits || "ימות המשיח";

    // קריאת Google Custom Search API (צריך להכניס API KEY אמיתי!)
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_ENGINE_ID&q=${encodeURIComponent(query)}`);
    const data = await response.json();

    let result = "לא נמצאו תוצאות";
    if (data.items && data.items.length > 0) {
      result = data.items[0].title + " - " + data.items[0].link;
    }

    res.json({ success: true, message: `שלום ${caller}, התוצאה הראשונה היא: ${result}` });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "שגיאה בעת החיפוש" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Google Search Server רץ על פורט ${PORT}`));
