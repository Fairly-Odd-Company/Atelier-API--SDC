const express = require('express');
require('dotenv').config();
const { getAllreviews, getMeta, incrementHelpful, reportReview, insertReview, loaderio } = require('./controller.js')
const app = express();
app.use(express.json())

app.get('/reviews', getAllreviews);
app.get('/reviews/meta', getMeta);
app.put('/reviews/:review_id/helpful', incrementHelpful);
app.put('/reviews/:review_id/report', reportReview);
app.post('/reviews', insertReview);
app.get('/loaderio-02253c2cf1dbe1a0c0f09707dcb30094.txt', loaderio);
const port = process.env.Port || 3000;
app.listen(port);
console.log(`server listening at port: ${port}`)
