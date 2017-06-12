
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
    var data = {login: "1"};
    res.render('index.ejs', data);
  } else {
    var data = {login: "0"};
    res.render('index.ejs', data);
  }
})

app.get('/callback', function (req,res) {
  var sess = req.session;
  sess.authtoken = req.query.token;
  console.log("sudah dapat token=" + sess.authtoken);
  res.redirect('/');
});

app.get('/logout', function (req,res) {
  var sess = req.session;
  sess.authtoken = null;
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.redirect('/');
});

app.listen(4000, function () {
  console.log('Example client app listening on port 4000!')
})



