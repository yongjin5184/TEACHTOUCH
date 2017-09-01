/**
 * fileupload service
 */

app.post('/upload', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	console.log(JSON.stringify(req.files.uploadFile.path));
	//var PATH = req.files.uploadFile.path.toString();
	//console.log(PATH);
	fs.readFile(req.files.uploadFile.path,function(error,data){
		var dirPath = __dirname + "\\upload";
		if(!fs.existsSync(dirPath)) {
			fs.mkdir(dirPath, 0707, function(err) {
				if(err) throw err;
				console.log('Created newdir');
			});
		}
        var filePath = dirPath+"\\"+ req.files.uploadFile.name;
        fs.writeFile(filePath, data, function(error){
            if(error){
                //console.log(error);
                throw error;
            }else{
                res.redirect('back');
            	console.log('upload success');
            }
        });
    });
});

