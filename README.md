# سعراتي

تطبيق ويب لتتبع السعرات والتمارين، يعمل على الجوال ويتزامن مع Google Sheets.

## تشغيل التطبيق
افتح **index.html** فقط. باقي الملفات يستدعيها تلقائياً.
(للتثبيت على شاشة الجوال والعمل بدون نت، ارفع المجلد كاملاً على استضافة https مثل GitHub Pages أو Netlify.)

## ترتيب الملفات
```
calfit/
├── index.html            ← الملف الوحيد الذي تفتحه
├── manifest.json         ← إعدادات التثبيت كتطبيق
├── sw.js                 ← العمل بدون إنترنت
├── css/
│   └── style.css         ← كل التنسيق
├── js/                   ← بهذا الترتيب في index.html
│   ├── foods-data.js     ← بيانات الـ 1000 صنف (من ملف الإكسل)
│   ├── core.js           ← أدوات، ثوابت، حفظ البيانات، الحسابات
│   ├── sync.js           ← المزامنة مع Google Sheets
│   ├── foods.js          ← قسم دليل الأغذية (بحث وفلاتر)
│   ├── views.js          ← شاشات اليوم والتمارين والتقدم والإعدادات
│   ├── sheets.js         ← النوافذ السفلية (إضافة أكل/تمرين)
│   └── app.js            ← الأزرار والأحداث ونقطة التشغيل
└── apps-script/
    └── Code.gs           ← يُلصق في Apps Script داخل الشيت (لا يُشغَّل محلياً)
```

## ربط Google Sheets
1. أنشئ Google Sheet ثم Extensions ▸ Apps Script والصق `apps-script/Code.gs`.
2. Deploy ▸ New deployment ▸ Web app (Execute as: Me، Who has access: Anyone).
3. الصق رابط `/exec` في التطبيق: الإعدادات ▸ الربط مع Google Sheets.

## تعديل بيانات الأغذية
عدّل `js/foods-data.js`. كل صف: `[رقم، الاسم، سعرات لكل 100 غ، رقم القسم، 1=أساسي/0=نسخة]`.
