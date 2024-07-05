import fs from "fs/promises";

const pokemonNaam = "pikachu";


const createFolder = async (foldername) => {
    await fs.mkdir(foldername)
    .then(() => {
        console.log(`folder ${foldername} succesfully created`);
    })
    .catch((err) => {
        console.log("failed to create folder");
        console.error(err)
    })
}

const savePokemonStats = async (filePath, pokemonStatsObject) => {
    for (const stat of pokemonStatsObject){
        const statNumber = stat['base_stat'];
        const statName = stat['stat'].name;
        await fs.appendFile(`${filePath}/pokemonstats.txt`, `\n ${statName} = ${statNumber}`);
    }
}

const savePokemonSprites = async (filePath, pokemonSpritesObject) => {
    const keys = Object.keys(pokemonSpritesObject);
    const values = Object.values(pokemonSpritesObject);
    for (const key in keys){
        if(typeof(values[key]) == "string"){
            fetch(values[key])
            .then((response) => response.arrayBuffer())
            .then( async (image) => {
                await fs.writeFile(`${filePath}/${keys[key]}.png`, Buffer.from(image));
            });
        }
    }
}

const savePokemonArtwork = async (filePath, pokemonArtworkObject) => {
    const keys = Object.keys(pokemonArtworkObject);
    const values = Object.values(pokemonArtworkObject);
    for (const key in keys){
        fetch(values[key])
        .then((response) => response.arrayBuffer())
        .then( async (image) => {
            await fs.writeFile(`${filePath}/${keys[key]}_Official-Artwork.png`, Buffer.from(image));
        });
    }
}

const parseOptions = async (pokemonObject, optionsObject) => {
    const filePath = pokemonObject.forms['0'].name;
    const statsObject = pokemonObject.stats;
    const spriteObject = pokemonObject.sprites;
    const artworkObject = pokemonObject.sprites.other["official-artwork"];
    // console.log(statsObject);
    // console.log(spriteObject);
    await createFolder(filePath);
    for(const option of optionsObject.info){
        switch(option){
            case "Stats":
                await savePokemonStats(filePath, statsObject);
                break;
            case "Sprites":
                await savePokemonSprites(filePath, spriteObject);
                break;
            case "Artwork":
                await savePokemonArtwork(filePath, artworkObject);
                break;
        }
    }
}


export { parseOptions }; 