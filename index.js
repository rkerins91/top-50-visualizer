const express = require('express')
const request = require('request')
const querystring = require('querystring')
const path = require('path')
const bodyParser = require('body-parser')
const {REDIRECT_URI, SPOTIFY_CLIENT_ID, SPOTIFY_SECRET} = require('./secrets')


const app = express()

const redirect_uri = 
REDIRECT_URI || 
'http://localhost:3000/callback'

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))

app.get('/login', async function(req, res) {
  await res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope: 'user-top-read',
      redirect_uri: redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`
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

// app.post('/getSongs', async (req, res, next) => {


// app.post('/getFeatures', async (req, res, next) => {
//   console.log(req.body.params)
//   const token = req.body.params.token
//   const reqBody = querystring.stringify({Authorization: `Bearer ${token }`, limit: '50', time_range: 'medium_term'})
//   const data = await app.get('https://api.spotify.com/v1/me/top/tracks?' + reqBody, (req, res, next) => {
//   })
  
//   res.send(data)
  
// })

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

let port = 3000
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)