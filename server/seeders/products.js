// const uuid = require("uuid4");

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert("product", [
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2018/03/Rabbit-Egg-Hunt-with-Zombie-Jesus-OG-BLM-BLG1-Side.jpg",
        name: "RABBIT EGG HUNT WITH ZOMBIE JESUS",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2018/03/10-Ways-to-Kill-a-Peep-OG-YWM-YWG1-Side.jpg",
        name: "10 WAYS TO KILL A PEEP",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2018/03/Purple-Drank-Jelly-Beans-OG-PRM-PRG1-Side.jpg",
        name: "PURPLE DRANK JELLY BEANS",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2018/03/Dat-Dank-Easter-Basket-Grass-OG-PKM-PKG1-Side.jpg",
        name: "DAT DANK EASTER BASKET GRASS",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2017/02/SIDE_0002_Black-with-Black-Side-View.jpg",
        name: "A GINGER’S SOUL",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2015/10/SIDE_0016_Flamingo-Side-View.jpg",
        name: "FLAMINGOS ON A BOOZE CRUISE",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2015/10/SIDE_0017_Donkey-Side-View.jpg",
        name: "DONKEY GOGGLES",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2017/01/SIDE_0014_Meatball-Side-View.jpg",
        name: "SWEDISH MEATBALL HANGOVER",
        price: 2500,
      },
      {
        image_url:
          "https://www.playgoodr.com/wp-content/uploads/2017/02/SIDE_0000_Blue-Side-View.jpg",
        name: "FALKOR’S FEVER DREAM",
        price: 2500,
      },
      {
        image_url: "https://www.playgoodr.com/wp-content/uploads/2015/10/Side-1.jpg",
        name: "SUNBATHING WITH WIZARDS",
        price: 2500,
      },
    ]);
  },
};
