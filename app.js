var express = require('express');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use("/static", express.static(path.join(__dirname, '/static')));

app.use('/ar-food', require('./ar-food.js'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || 80, function() {
  console.log('http://localhost:'+this.address().port);
});
