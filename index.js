var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

// Configuración de multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta de carga de archivos
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (req.file) {
    const { originalname, mimetype, size } = req.file;
    res.json({
      name: originalname,
      type: mimetype,
      size: size
    });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
