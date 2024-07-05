import { parseOptions } from "./saving.js";
import inquirer from 'inquirer';



const fetchPokemon = async (pokemon) => {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    return fetch(url + pokemon.toLowerCase())
    .then((result) => {
        try{
            return result.json();
        }
        catch (err) {
            return console.error(err);
        }
    })
    .then((resultObject) => {
        try{
            return resultObject;
        }
        catch (err) {
            return console.error("fout" + err);
        }
    })
};

const promptPokemon = async () => {
    return inquirer
        .prompt([
        {
            name: 'name',
            message: 'Pokemon name:',
            type: 'input',
            validate: (name) => {
                if(!name.length) return 'please provide a name';
                return true;
            }
        }
        ])
        .then((answers) => {
            return answers.name;
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
};


const promptDownloadInfo = async () => {
    return inquirer
        .prompt([
        {
            name: 'info',
            message: 'What would you like to download?',
            type: 'checkbox',
            choices: [
                'Stats', 'Sprites', 'Artwork'
            ],
            validate: (choiceObject) => {
                if(!choiceObject.length) return 'please select at least one option';
                return true;
            }
        }
        ])
        .then((options) => {
            return options;
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error(error);
            } else {
                console.error(error);
            }
        });
};

const promptContinue = async () => {
    return inquirer
    .prompt([
    {
        name: 'boolean',
        message: 'Would you want to look for a different pokemon?',
        type: 'confirm',
    }
    ])
    .then((boolean) => {
        console.log(boolean);
        return boolean;
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error(error);
        } else {
            console.error(error);
        }
    });
};

const promptUser = async () => {
    let lookForPokemon = true;
    while(lookForPokemon){
    const pokemon = await promptPokemon();
    const optionsObject = await promptDownloadInfo();
    const pokemonObject = await fetchPokemon(pokemon);
    await parseOptions(pokemonObject, optionsObject);
    const continueObject = await promptContinue();
    lookForPokemon = continueObject.boolean;
    };
};

export { promptUser };