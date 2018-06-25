
function generateWinningNumber() {
    var rng = Math.random();
    var flag = 0;

    if(rng === 0){ return 1; }

    rng *= 100;
    rng += 1;
    rng = Math.floor(rng);

    console.log("The answer is: " + rng);

    return rng;
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  Game.prototype.difference = function(){
      var output = this.playersGuess - this.winningNumber;
      if(output < 0){ output *= -1; }
      return output;
  }

  Game.prototype.isLower = function(){
    var output = false;
    if(this.playersGuess < this.winningNumber){ output = true; }
    
    if(output === true){ 
      $('#subtitle').text('Try guessing higher');
    } else { 
      $('#subtitle').text('Try guessing lower');
    }

    if(this.pastGuesses.length === 5){ 
      $("#subtitle").text("Hit the reset button to try again"); 
      $('#hint, #submit').prop("disabled",true);
    }
    
    return output;
  }

  Game.prototype.playersGuessSubmission = function(num){
    this.playersGuess = num;
    if(this.playersGuess <= 0 || this.playersGuess > 100 || typeof this.playersGuess !== "number"){ 
      throw "That is an invalid guess."; 
    }
    return this.checkGuess();
  }

  Game.prototype.checkGuess = function(){
    if(this.winningNumber === this.playersGuess){ 
      win();
      return "You Win!"; 
    }

    if(this.pastGuesses.includes(this.playersGuess) === true){ 
      return "You have already guessed that number."; 
    }
    

    this.pastGuesses.push(this.playersGuess);
    if(this.pastGuesses.length === 1){ $('#guess1').text(this.playersGuess); }
    if(this.pastGuesses.length === 2){ $('#guess2').text(this.playersGuess); }
    if(this.pastGuesses.length === 3){ $('#guess3').text(this.playersGuess); }
    if(this.pastGuesses.length === 4){ $('#guess4').text(this.playersGuess); }
    if(this.pastGuesses.length === 5){ $('#guess5').text(this.playersGuess); }
    if(this.pastGuesses.length === 5){ return "You Lose."; }

    
    if(this.difference() < 10){ return "You're burning up!"; }
    if(this.difference() < 25){ return "You're lukewarm."; }
    if(this.difference() < 50){ return "You're a bit chilly."; }
    if(this.difference() < 100){ return "You're ice cold!"; }  
  }

  function newGame(){
      return new Game();
  }

  Game.prototype.provideHint = function(){
      var output = [];
      output.push(this.winningNumber);
      
      for(var i = 0; i < 2; i++){
        output.push(generateWinningNumber());
      }

      output = shuffle(output);
      return output;
  }

   function makeAGuess(game){
    var guess = $('#player-input').val();
    guess *= 1;

    $('#player-input').val("");

    return game.playersGuessSubmission(guess);
  }

  function win(){
    $('#win').show();
    //$('#subtitle').hide();
    //$('#player-input').hide();
    //$('#submit').hide();
    //$('#hint').hide();
    $('#app').hide();
  }

  //----------------------------------------------//

  $(document).ready(function() {

    var game = new Game();

    $('#submit').click(function(){
      $('#title').text(makeAGuess(game));
      game.isLower(); //sets the subtitle text   
    });

    $('#reset').click(function() {
      game = newGame();
      $('#title').text('Play the Guessing Game!');
      $('#subtitle').text('Guess a number between 1-100!')
      $('.guess').text('-');
      $('#hint, #submit').prop("disabled",false);
    });

    $('#hint').click(function(){
      var hints = game.provideHint();
      $('#title').text("'The winning number is " + hints[0] + ', ' + hints[1]+ ', or ' + hints[2])
      $('#hint').prop("disabled", true);
    });

    $('#play-again').click(function(){
      game = newGame();
      $('#title').text('Play the Guessing Game!');
      $('#subtitle').text('Guess a number between 1-100!')
      $('.guess').text('-');
      $('#hint, #submit').prop("disabled",false);
      $('#app').show();
      $('#win').hide();
    });
    
  });