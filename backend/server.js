const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// 1. إعداد قاعدة البيانات
const db = new sqlite3.Database('./social.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY, platform TEXT, followers INTEGER, engagementRate REAL)");
  
  db.get("SELECT count(*) as count FROM stats", (err, row) => {
    if (row && row.count === 0) {
      // إدخال البيانات الأولية لـ 3 منصات
      db.run("INSERT INTO stats (platform, followers, engagementRate) VALUES ('YouTube', 1520, 5.4)");
      db.run("INSERT INTO stats (platform, followers, engagementRate) VALUES ('Instagram', 4300, 3.2)");
      db.run("INSERT INTO stats (platform, followers, engagementRate) VALUES ('TikTok', 8500, 7.2)");
      console.log("Initial data inserted: YouTube, Instagram, TikTok");
    }
  });
});

// 2. دالة التحليل (AI Logic)
const analyzeData = (rate) => {
  if (rate >= 5) return "أداء رائع! استمر بنفس نوعية المحتوى.";
  if (rate >= 3) return "أداء جيد، لكن جرب التفاعل أكثر مع الجمهور.";
  return "تنبيه: التفاعل منخفض. جرب تغيير وقت النشر.";
};

// 3. مسار جلب البيانات (GET)
app.get('/api/stats', (req, res) => {
  db.all("SELECT * FROM stats", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const enrichedData = rows.map(row => ({
      ...row,
      aiAdvice: analyzeData(row.engagementRate)
    }));
    
    res.json(enrichedData); 
  });
});

// 4. مسار المزامنة المحدث (POST) ليشمل TikTok
app.post('/api/sync', (req, res) => {
  // توليد أرقام عشوائية للمنصات الثلاث
  const newYoutube = Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500;
  const newInsta = Math.floor(Math.random() * (5500 - 4000 + 1)) + 4000;
  const newTikTok = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000;

  const query = `
    UPDATE stats 
    SET followers = CASE 
      WHEN platform = 'YouTube' THEN ? 
      WHEN platform = 'Instagram' THEN ? 
      WHEN platform = 'TikTok' THEN ?
    END
    WHERE platform IN ('YouTube', 'Instagram', 'TikTok')
  `;

  db.run(query, [newYoutube, newInsta, newTikTok], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "تمت مزامنة المنصات الثلاث بنجاح!", updated: true });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));