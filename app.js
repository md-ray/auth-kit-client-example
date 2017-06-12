
// Express and Co
const express = require('express')
const app = express()
var session = require('express-session');
app.use(session({ secret: 'testsecret', cookie: { maxAge: 60000 }}))

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', function (req, res) {
  var sess = req.session;

  if (sess.authtoken) {
    res.send('hello world sudah login');
  } else {
    res.render('not-login');
  }
})

app.get('/callback', function (req,res) {
  var sess = req.session;
  sess.authtoken = '12345';
  res.send("sudah dapat token");
});

app.get('/logout', function (req,res) {
  var sess = req.session;
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.send("sudah logout");
});

app.listen(4000, function () {
  console.log('Example client app listening on port 4000!')
})



