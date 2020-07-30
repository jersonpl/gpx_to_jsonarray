const fs = require('fs');

fs.readFile('./file_name.gpx', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }else{
    var nameBegin = data.search("<name>");
    var nameEnd = data.search("</name>");

    var name = data.substring(nameBegin + 6, nameEnd);

    var string = data;
    const listCoords = [];
    while(true){
      const lat = string.search("lat=");
      const lon = string.search("lon=");
      const ele = string.search("<ele>");

      if(lat === -1){
        break;
      }

      var latitude = string.substring(lat + 5, lat + 15);
      var longitude = string.substring(lon + 5, lon + 16);
      var elevation = string.substring(ele + 5, ele + 9)

      string = string.replace('lat="'+latitude + '"', "");

      listCoords.push({latitude : parseFloat(latitude), longitude : parseFloat(longitude), elevation : parseFloat(elevation)});
    }
    fs.writeFile(name + ".js", JSON.stringify(listCoords), (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
  }
});