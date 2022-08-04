const express = require('express');
const path = require('path');
const { getAllreviews, getMeta, incrementHelpful, reportReview, insertReview } = require('./controller.js')
const app = express();
app.use(express.json())

app.get('/reviews', getAllreviews);
app.get('/reviews/meta', getMeta);
app.put('/reviews/:review_id/helpful', incrementHelpful);
app.put('/reviews/:review_id/report', reportReview);
app.post('/reviews', insertReview);

app.listen(3000);
console.log(`server listening at port: 3000`)
