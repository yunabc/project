var glob = require('glob');
var fs = require('fs');
var files = glob.sync('./img/*');
var json = {img:files};
fs.writeFileSync('./imgList.json',JSON.stringify(json),['utf8']);
console.log(files);
