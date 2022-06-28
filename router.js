var express = require('express');
const router  = express.Router();
router.use(express.json());
var fs = require('fs');
var csvtojson = require('csvtojson');
var fileupload = require('express-fileupload');
const { parse } = require('path');
router.use(fileupload());

var csvfile = 'information.csv';

//read file using fs
router.post('/read', (req, res) => {
    fs.writeFileSync('./filesystemCRUD/incomingData.csv', req.files.csv_file.data, (err) => {
        if(err) throw err;
    })
    csvtojson()
        .fromFile('./filesystemCRUD/incomingData.csv')
        .then((result) => {
            fs.unlinkSync('./filesystemCRUD/incomingData.csv', (err) => {
                if(err) throw err;
            });
            fs.writeFile('information.csv', "", (err) => {
                console.log("inside write file");
                if(err) throw err;
            })
            return res.send(result);
        })
});

router.post('/add', (req, res) => {
    console.log(req.files.csv_file);
    fs.writeFile('./filesystemCRUD/incomingData.csv', req.files.csv_file.data, (err) => {
        if(err) throw err;
    });
    csvtojson()
        .fromFile('./filesystemCRUD/incomingData.csv')
        .then((result) => {
            fs.readFile('./filesystemCRUD/jsonfile.json', (err, data) => {
                if(err) throw err;
                var json;
                if(data.length === 0) {
                    json = [];
                } else {
                    json = JSON.parse(data);
                }
                for(let obj of result) {
                    json.push(obj);
                }
                fs.writeFile('./filesystemCRUD/jsonfile.json', JSON.stringify(json), (err) => {
                    if(err) throw err;
                    fs.unlink('./filesystemCRUD/incomingData.csv', (err) => {
                        if(err) throw err;
                        return res.send("info added");
                    });
                });
            });
        });
});


module.exports = router;