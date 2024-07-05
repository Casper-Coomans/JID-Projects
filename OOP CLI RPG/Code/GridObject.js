class GridObject {
    #bgSprites = ['🌳', '🌴', '🎄', '🌵']

    constructor(sprite, type = 'undiscovered'){
        if(!sprite){
            const randomIndex = Math.floor(Math.random() * this.#bgSprites.length)
            this.sprite = this.#bgSprites[randomIndex];
        } else{
            this.sprite = sprite;
        }
        this.type = type;

    }

    describe(){
        const random = Math.random();
        if (random < 0.33){
            console.log("Coast is clear");
        } else if (random < 0.66){
            console.log("gast ge zijt hier al eerder geweest");
        } else{
            console.log("deja vu!")
        }
    }
}

export { GridObject };