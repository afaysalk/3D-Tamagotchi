var Tamagotchi = {

  initialize: function (name, imageNumber, birthdate) {
    this.name = name;
    this.image = imageNumber;
    this.birthdate = birthdate;
    this.isSleeping = false;
    this.foodLevel = 10;
    this.happinessLevel = 10;
    this.restedLevel = 10;
    this.healthLevel = 10;
    this.foodBar = "optimum";
    this.happinessBar = "optimum";
    this.restedBar = "optimum";
    this.healthBar = "optimum";
  },

  calcHealthLevel: function () {
  
      return this.healthLevel;
    
  },

// Action functions - need buttons

  feed: function () {
    if (this.foodLevel < 15) {
      this.foodLevel++;
    };
  },

  play: function () {
    if (this.happinessLevel < 15) {
      this.happinessLevel++;
    };
  },

  medicine: function () {
    if (this.healthLevel < 15) {
      this.healthLevel++;
    };
  },

  putToBed: function () {
    if (!this.isSleeping) {
      this.isSleeping = true;
    };
  },

// State variable readers

  isAlive: function () {
    if ((this.healthLevel < 2) || (this.foodLevel === 0)) {
      return false;
    } else {
      return true;
    };
  },

// Warning functions

  restedLevelWarning: function () {
    var restedWarning = false;
      if (this.restedLevel < 4) {
        restedWarning = true;
      };
    return restedWarning;
  },

  foodLevelWarning: function () {
    var foodWarning = false;
      if (this.foodLevel < 4) {
        foodWarning = true;
      };
    return foodWarning;
  },

  happinessLevelWarning: function () {
    var happinessWarning = false;
      if (this.happinessLevel < 4) {
        happinessWarning = true;
      };
    return happinessWarning;
  },

  healthLevelWarning: function () {
    var healthWarning = false;
      if (this.healthLevel < 4) {
        healthWarning = true;
      };
    return healthWarning;
  },

// Time passes


  bar: function(level) {
    if   (level<4)  
    return "low"
    else if   (level<8)
    return "high"
    else if   (level<10)
    return "optimum"
    else  if (level<15)
    return  "max"
  
  
  
  },  


  timePasses: function (intervalID) {
    if (this.isSleeping) {
      if (this.restedLevel < 15) {
        this.restedLevel++;
      };
      if (this.happinessLevel > 0) {
        this.happinessLevel--;
      };
    } else { // is awake
      if (this.foodLevel > 0) {
        this.foodLevel--;
        this.foodBar=this.bar(this.foodLevel)
      };
      if (this.restedLevel > 0) {
        this.restedLevel--;
      };
      if (this.happinessLevel > 0) {
        this.happinessLevel--;
      };
    };
    this.healthLevel = this.calcHealthLevel();
    this.setTamagotchiMeters(intervalID);
  },

  setTamagotchiMeters: function (intervalID) {

    if (this.isSleeping) {
      $(".asleep-or-awake").html("<img src='./img/bird-asleep.png' class='photo-width'>");
    } else {
      $(".asleep-or-awake").html("<img src='./img/bird-awake.png' class='photo-width'>");
    };

    $(".food-meter").html("<img src='./img/char0.png' class='svg-"+this.foodBar+"'</img>");
    $(".happiness-meter").html("<meter value=" + this.happinessLevel + " min='-1' low='4' high='8' optimum='10' max='15'></meter>");
    $(".rested-meter").html("<meter value=" + this.restedLevel + " min='-1' low='3' high='8' optimum='10' max='15'></meter>");
    this.healthLevel = this.calcHealthLevel();
    $(".health-meter").html("<meter value=" + this.healthLevel + " min='-1' low='4' high='8' optimum='10' max='15'></meter>");

    $(".alert").removeClass("alert-warning");
    $(".alert-msg").text("");

    if (!this.isAlive()) {
      $(".alert").addClass("alert-danger");
      $(".alert-msg").text("Too late! Your Tamagotchi is DEAD!");
      $(".show-message").html("<h6>&nbsp</h6><img class='flip-vertical photo-width' src='./img/char1.png' alt='Picture of character'>");
      $(".asleep-or-awake").html("<img src='./img/bird-asleep.png' class='tiny-photo-width'>");
      $("button#feed img").addClass("opaque")
      $("button#feed").off("click");
      $("button#play img").addClass("opaque")
      $("button#play").off("click");
      $("button#put-to-bed img").addClass("opaque")
      $("button#put-to-bed").off("click");
      $("button#medicine img").addClass("opaque")
      $("button#medicine").off("click");
      clearInterval(intervalID);
    } else if (this.healthLevelWarning()) {
      $(".alert").addClass("alert-warning");
      $(".alert-msg").text("Your Tamagotchi is sick: Feed, play, put to bed, give medicine!")
    } else if (this.foodLevelWarning()) {
      $(".alert").addClass("alert-warning");
      $(".alert-msg").text("Your Tamagotchi is hungry: Feed it!");
    } else if (this.happinessLevelWarning()) {
      $(".alert").addClass("alert-warning");
      $(".alert-msg").text("Your Tamagotchi is sad: Play with it!");
    } else if (this.restedLevelWarning()) {
      $(".alert").addClass("alert-warning");
      $(".alert-msg").text("Your Tamagotchi is tired: Put it to bed!")
    };
  }
}; // end Tamagotchi



$(document).ready (function () {

  var numberImage = -1;
  $(".show-message").html("<h6>&nbsp</h6><img class='photo-width' src='./img/char1.png' alt='Picture of character'>")
  



  
    var inputtedName = $("input#tamagotchi-name").val();
    var inputtedBirthday = $("input#tamagotchi-birthday").val();

    $(".tamagotchi-name").text(inputtedName);

    // inputtedBirthday is in format yyyy-mm-dd from using input type="date"

    var monthToDisplay = inputtedBirthday.slice(5,7);
    var dayToDisplay = inputtedBirthday.slice(8,10);
    var yearToDisplay = inputtedBirthday.slice(0,4);
    var dateToDisplay = monthToDisplay + "/" + dayToDisplay + "/" + yearToDisplay;

    $(".tamagotchi-birthday").text(dateToDisplay);

    $("input#tamagotchi-name").val("");
    $("input#tamagotchi-birthday").val("");

    $("#form-to-disappear").hide();
    $("#show-name-birthday").show();

    var difficulty = 1000;

    var myTamagotchi = Object.create(Tamagotchi);
    myTamagotchi.initialize(inputtedName, numberImage, dateToDisplay);

    myTamagotchi.setTamagotchiMeters(0);
    $("#meter-area").show();

    var intervalID;

    intervalID = setInterval(function() {
      myTamagotchi.timePasses();
      if (!myTamagotchi.isAlive()) {
        clearInterval(intervalID);
      };
    }, difficulty);

    $("button#feed").click (function () {
      clearInterval(intervalID);
      myTamagotchi.setTamagotchiMeters();
      if (myTamagotchi.isSleeping) {
        myTamagotchi.isSleeping = false;
      };
      myTamagotchi.feed();
      myTamagotchi.setTamagotchiMeters();
      if (myTamagotchi.isAlive) {
        intervalID = setInterval(function() {
          myTamagotchi.timePasses();
          if (!myTamagotchi.isAlive()) {
            clearInterval(intervalID);
          };
        }, difficulty);
      };
    });

    $("button#play").click (function () {
      clearInterval(intervalID);
      myTamagotchi.setTamagotchiMeters();
      if (myTamagotchi.isSleeping) {
        myTamagotchi.isSleeping = false;
      };
      myTamagotchi.play();
      myTamagotchi.setTamagotchiMeters();
      if (myTamagotchi.isAlive) {
        intervalID = setInterval(function() {
          myTamagotchi.timePasses();
          if (!myTamagotchi.isAlive()) {
            clearInterval(intervalID);
          };
        }, difficulty);
      };
    });

    $("button#put-to-bed").click (function () {
      clearInterval(intervalID);
      myTamagotchi.setTamagotchiMeters();
      myTamagotchi.putToBed();
      myTamagotchi.setTamagotchiMeters();
      if (myTamagotchi.isAlive) {
        intervalID = setInterval(function() {
          myTamagotchi.timePasses();
          if (!myTamagotchi.isAlive()) {
            clearInterval(intervalID);
          };
        }, difficulty);
      };
    });

    $("button#medicine").click (function () {
      clearInterval(intervalID);
      myTamagotchi.setTamagotchiMeters();
      myTamagotchi.medicine();
      myTamagotchi.setTamagotchiMeters();
      if (myTamagotchi.isAlive) {
        intervalID = setInterval(function() {
          myTamagotchi.timePasses();
          if (!myTamagotchi.isAlive()) {
            clearInterval(intervalID);
          };
        }, difficulty);
      };
    });

   // end form submit

});
