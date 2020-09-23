class Food{
    constructor(foodStock, lastFed){
        this.image = loadImage("Milk.png");
        this.foodStock = 20;
        this.lastFed = lastFed;
    }

    getFoodStock(){
        var getFoodStockRef = database.ref("Food");
        getFoodStockRef.on("value", function(data){
            foods = data.val();
        })

    }

    updateFoodStock(count){
        database.ref("/").update({
            Food : count
        })
    }

    deductFoodStock(count){
        database.ref("/").update({
            Food : count--
        })
    }

    display(){
        var x = 80, y = 200;

        imageMode(CENTER);
        image(this.image,720,220,70,70)

        if(this.foodStock!=0){
           for(var i=0; i<this.foodStock; i++){
               if(i%10==0){
                   x=80;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
        }
    }
}