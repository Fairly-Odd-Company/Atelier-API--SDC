const express = require('express');
const path = require('path');
const { getAllreviews, getMeta, incrementHelpful, reportReview, insertReview, loaderioo } = require('./controller.js')
const app = express();
app.use(express.json())

app.get('/reviews', getAllreviews);
app.get('/reviews/meta', getMeta);
app.put('/reviews/:review_id/helpful', incrementHelpful);
app.put('/reviews/:review_id/report', reportReview);
app.post('/reviews', insertReview);
app.get('/loaderio-5f74b65164351c6e8cfe4b695d5f05df.txt', loaderio);
const port = process.env.Port || 3000;
app.listen(port);
console.log(`server listening at port: ${port}`)
