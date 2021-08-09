var express = require('express');
const logger = require('morgan');
const axios = require('axios');
const firebase=require('./firebase');
const cors=require('cors');
var app = express()
const port = 3000

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({'extended' : true}));
app.use(logger('dev'));
app.use(express.static('public'));   // html, image 등 정적파일 제공 폴더 지정


app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.post('/like', (req, res) => {
  console.log(req.body.id);
  console.log(req.body.likes);
  var db=firebase.firestore();
  db.collection('likes').doc(String(req.body.id)).set({like : req.body.likes});
  res.send(req.body);    
})

//curl localhost:3000/user/tommy
app.get('/user/:id', (req, res) => {
  res.send(`User id is ${req.params.id}`); // Or res.send('User id is ' + req.params.id); 
})

// In zsh, u should try curl "http://localhost:{port}/user?id={ur-id}" //curl "http://localhost:3000/user?id=tommy"
app.get('/user', (req, res) => {
  res.send(`User id is ${req.query.id}`);
})

// curl -X POST localhost:3000/user -d '{"id" : "jyc", "name" : "Jae Young"}' -H "Content-Type: application/json"
app.post('/user', (req, res) => {
  console.log(req.body.name);
  res.send(req.body);    
})

app.get('/music_list', (req,res) => {
  res.json(list);
})

app.get('/musicSearch/:term/:offset/:limit', async (req, res) => {
  
  const params = {
    term : req.params.term,
    entity: "album",
    offset: req.params.offset,
    limit: req.params.limit
  }
  var response = await axios.get('https://itunes.apple.com/search', {params : params}).catch(e => console.log(e));
  console.log(response.data);
  res.json(response.data);
})

function getSaturday(){
  today=new Date();
  let diff=today.getDate()-today.getDay()-1;
  return new Date(today.setDate(diff));
}

app.get('/chart', async (req, res)=>{
  let thisSaturday = getSaturday();
  let year = thisSaturday.getFullYear();
  let month = ('0' + (thisSaturday.getMonth() + 1)).slice(-2);
  let day = ('0' + thisSaturday.getDate()).slice(-2);
  let dateString = year + '-' + month  + '-' + day;
  console.log(dateString);
  const options = {
    method: 'GET',
    url: 'https://billboard-api2.p.rapidapi.com/hot-100',
    params: {date: dateString, range: '1-10'},
    headers: {
      /*
      'x-rapidapi-key': 'here your key...',
      'x-rapidapi-host': 'here your host...'
      */
    }
  };
  axios.request(options).then(response => {
    console.log(response.data.content);
    res.json(response.data.content);
  }).catch(function (error) {
    console.error(error);
  });

});

app.get('/favorite', async (req, res) => {
  
  const params = {
    id : "",
    entity: "album",
  }
  var idstring=""

  var db=firebase.firestore();
  const likesRef=db.collection('likes');
  const snapshot=await likesRef.where('like','==',true).get().catch(e=>console.log(e));
  if(snapshot.empty){
    console.log("No result");
    res.json({ msg : "아직 좋아요한 앨범이 없습니다."});
  }else{
    snapshot.forEach(doc=>{
      console.log(doc.id, '=>', doc.data());
      idstring=idstring+String(doc.id)+',';
    })
    params.id+=idstring.substr(0,idstring.length-1);
    const response = await axios.get('https://itunes.apple.com/lookup', {params : params}).catch(e=>console.log(e));
    console.log(response.data);
    res.json(response.data);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});