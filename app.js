let app = require('express')()
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send()
})

app.listen(port, function() {
  console.log("server started on port", port)
}
