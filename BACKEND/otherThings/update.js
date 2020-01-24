const song = require("../src/database/models/index").Song;
const request = require("request")

main = async () => {

    try {
        
    const songs = await song.findAll({where: {id: 4}})

    let songLength = songs.length;
    let i = 0;
    songs.forEach(element => {
        console.log(++i+"/"+songLength);
        var options = {
            url: 'https://itunes.apple.com/lookup?id=' + element.dataValues.iTunesID
        }
        request(options, async (error, response, body) => {
            
            if (error) {
                console.log(error)     
            }
            body = JSON.parse(body)
            const updateSong = body.results[0];
            console.log(body);
            const modifiedArtworkURL= updateSong.artworkUrl100.replace("100x100bb","600x600bb")
            const update = {
                URL: updateSong.previewUrl,
                artistName: updateSong.artistName,
                collectionName: updateSong.collectionName,
                artworkURL: modifiedArtworkURL
            }
            
            console.log(update);
            
            return
            await song.update(update, {where: {id: element.id}})
            

            
        })
    });

    } catch (error) {
        console.log(error);
        
    }

    console.log("Tutto Finito");
    
}

main();
console.log("finished Meth");

