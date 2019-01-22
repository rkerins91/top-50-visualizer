const express = require('express')
const request = require('request')
const querystring = require('querystring')
const path = require('path')

const app = express()

const redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:3000/callback'

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/login', async function(req, res) {
  await res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: 'a503fe3508eb468d998289055d0d249a',
      scope: 'user-top-read',
      redirect_uri: 'http://localhost:3000/callback'
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: 'http://localhost:3000/callback',
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        'a503fe3508eb468d998289055d0d249a:92bc670cb7fc44cab35c852692cfbbe9'
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, async function(error, response, body) {
    var access_token = body.access_token
    let uri = 'http://localhost:3000/'
    await res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

let port = 3000
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)