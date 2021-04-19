class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",(data)=>{
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Image);

    car2 = createSprite(300,200);
    car2.addImage(car2Image);

    car3 = createSprite(500,200);
    car3.addImage(car3Image);

    car4 = createSprite(700,200);
    car4.addImage(car4Image);

    cars = [car1,car2,car3,car4];

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();
    if(allPlayers !== undefined){
      background("#c68767");
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);

      // index of the cars array
      var index = 0;

      //the x and y position of cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        // 1 gets added to index in each for loop
        index += 1;
        //position of the cars so that they are at a distance
        x = x+220;
        //data from database to show the distance travelled 
        y = displayHeight-allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill("white");
          text(allPlayers[plr].name,x-20,y-70);
        }

        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance,120,displayPosition);
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 50;
      player.update();
    }
    if(player.distance>4200){
      gameState = 2;
    }

    drawSprites();
  }

  end(){
    console.log("Game Ends");
  }
}
