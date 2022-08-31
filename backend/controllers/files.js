const patient = require('../models/Patient');
const ipfsAPI = require('ipfs-api');
const { getdata, senddata } = require('../utils/web3');
const fs = require('fs');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

exports.uploadFiles = async (req, res) => {
    const { id, fileName } = req.body;
    const file = req.files.file;
    const newpath = __dirname + "/" + id;
    if(!fs.existsSync(newpath)){
        fs.mkdirSync(newpath);
    }
    file.mv(`${newpath}/${fileName}`, async (err) => {
        if(err){
            console.log(err);
        }
        let testfile = fs.readFileSync(`${newpath}/${fileName}`);
        let testBuffer = new Buffer(testfile);
        let files = await ipfs.files.add(testBuffer);
        await senddata(id, fileName, files[0].hash);
        let testlink = `http://localhost:8000/fileDownload/${id}/${files[0].hash}`;
        const newObj = {
            file: testlink,
            fileName: fileName
        }
        res.status(200).send(newObj);
    })
}

exports.viewFiles = async (req, res) => {
    const { id } = req.body;
    const files = await getdata(id);
    const sendData = [];
    for(let i = 0; i < files.length; i++){
        const element = files[i];
       // Hash, fileName
       let testlink = `http://localhost:8000/fileDownload/${id}/${element.userDataDetail}`;
       const newObj = {
            file: testlink,
            fileName: element.userDataFilename,
            fileHash: element.userDataDetail
       }
       sendData.push(newObj);
    }
    res.status(200).send(sendData);
}

exports.fileDownload  = async (req, res) => {
    const id = req.params['id'];
    const hash = req.params['hash']; 
    const files = await ipfs.files.get(hash);
    files.forEach((file) =>{
        res.status(200).send(file.content);
    })
}