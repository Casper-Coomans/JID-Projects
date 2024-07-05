import { GridObject } from "./GridObject.js";
import { itemObject } from "./ItemObject.js";
import { EnemyObject } from "./EnemyObject.js";
import { Player } from "./Player.js";
import { promptPlayerForDirection } from "./playerPrompts.js";

class Grid {
    #currentObj;

    constructor(width, height, playerStartX = 0, playerStartY = height - 1){
        this.width = width;
        this.height = height;
        this.playerX = playerStartX;
        this.playerY = playerStartY;
        this.player = new Player("Cappy", {
            attack: 3,
            defense: 20,
            hp: 10,
        })

        //maken van de grid
        this.grid = []
        for (let row = 0; row < height; row++){
            let currRow = [];
            for(let column = 0; column < width; column++){
                currRow.push(new GridObject())
            }
            this.grid.push(currRow);
        }

        //speler - hoek links beneden
        this.grid[height-1][0] = new GridObject('🦘', "player");

        //finish - rechts boven
        this.grid[0][width-1] = new GridObject('🌟', "finish");

        this.startGame();
    }

    async startGame() {
        while(this.player.getStats().hp > 0){
            this.displayGrid();
            const response = await promptPlayerForDirection();

            switch (response){
                case "Up": {
                    this.movePlayerUp();
                    break;
                }

                case "Down": {
                    this.movePlayerDown();
                    break;
                }

                case "Left": {
                    this.movePlayerLeft();
                    break;
                }

                case "Right": {
                    this.movePlayerRight();
                    break;
                }
            }
            console.log("-----------------------------------------------")
        }
    }
    
    displayGrid(){
        this.player.describe();
        for(let row = 0; row < this.height; row++){
            for(let column = 0; column < this.width; column++){
                process.stdout.write(this.grid[row][column].sprite + "  ")
            }
            process.stdout.write("\n")
            process.stdout.write("\n")
        }
    }

    generateGridObject(){
        const random = Math.random();
        let object;

        if( random < 0.15) {
            object = new itemObject('🧹', {
                name: "Broomstick",
                attack: 3,
                defense: 0,
                hp: 0
            })
        } else if ( random < 0.35){
            object = new EnemyObject('🦀', {
                name: "Crab",
                attack: 5,
                defense: 3,
                hp: 5
            })
        } else {
            object = new GridObject('🐾', 'discovered');
        }
        return object;
    }

    executeTurn(){
        if(this.grid[this.playerY][this.playerX].type == "finish"){
            console.log(`🥳 Congratz, you won the game`);
            process.exit();
        }
        
        if(this.#currentObj.type == "discovered"){
            this.#currentObj.describe();
            return;
        }

        if(this.#currentObj.type == "item"){
            this.#currentObj.describe();
            const itemStats = this.#currentObj.getStats();
            this.player.addToStats(itemStats);

            console.log(`Your updated stats:`);
            this.player.describe();
            return;
        }

        this.#currentObj.describe();
        const enemyStats = this.#currentObj.getStats();
        const enemyName = this.#currentObj.getName();
        const playerStats = this.player.getStats();

        if(enemyStats.defense >= playerStats.attack){
            console.log(`You died, ${enemyName} was too powerful`)
            process.exit();
        }

        let totalPlayerDamage = 0;
        while(enemyStats.hp > 0){
            const enemyDamageTurn = playerStats.attack - enemyStats.defense;
            const playerDamageTurn = enemyStats.attack - playerStats.defense;

            if(enemyDamageTurn > 0) {
                enemyStats.hp -= enemyDamageTurn;
            }

            if(playerDamageTurn > 0){
                playerStats.hp -= playerDamageTurn;
                totalPlayerDamage += playerDamageTurn;
            }
        }

        if(playerStats.hp <= 0){
            console.log(`You died, ${enemyName} was too powerful`)
            process.exit();
        };

        this.player.addToStats({hp: -totalPlayerDamage});
        console.log(`You defeated the ${enemyName}, Your updated stats:`);
        this.player.describe();


    }

    movePlayerRight(){
        if(this.playerX == this.width - 1){
            console.log("can not move right")
            return; //standing guard
        }

        this.grid[this.playerY][this.playerX] = new GridObject('🐾', 'discovered');
        this.playerX += 1;

        if(this.grid[this.playerY][this.playerX].type == "discovered"){
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
            return;
        }

        this.#currentObj = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
    }

    movePlayerLeft(){
        if(this.playerX == 0){
            console.log("can not move left")
            return; //standing guard
        }

        this.grid[this.playerY][this.playerX] = new GridObject('🐾', 'discovered');
        this.playerX -= 1;

        if(this.grid[this.playerY][this.playerX].type == "discovered"){
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
            return;
        }

        this.#currentObj = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
    }

    movePlayerUp(){
        if(this.playerY == 0){
            console.log("can not move up")
            return; //standing guard
        }

        this.grid[this.playerY][this.playerX] = new GridObject('🐾', 'discovered');
        this.playerY -= 1;

        if(this.grid[this.playerY][this.playerX].type == "discovered"){
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
            return;
        }

        this.#currentObj = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
    }

    movePlayerDown(){
        if(this.playerY == this.height - 1){
            console.log("can not move down")
            return; //standing guard
        }

        this.grid[this.playerY][this.playerX] = new GridObject('🐾', 'discovered');
        this.playerY += 1;

        if(this.grid[this.playerY][this.playerX].type == "discovered"){
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
            return;
        }

        this.#currentObj = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject('🦘', "player");
    }
}

new Grid(5,5);