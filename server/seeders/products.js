// const uuid = require("uuid4");

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert("product", [
      {
        image_url:
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=58321e04954daa3a0e2d3b1dc2a927da&auto=format&fit=crop&w=2250&q=80",
        name: "Bette Davis",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1538664564188-0196817e7ce6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d963c5fa90ff33150ac621759b4dd129&auto=format&fit=crop&w=800&q=80",
        name: "Jojo",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1518815068914-038920b6f0c6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=38f02f628dfcc539764a05b5bc42a419&auto=format&fit=crop&w=2024&q=80",
        name: "Snaggletooth",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1536643045078-14dba1190fa6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7f8d714b086e3b2d6e65004a66e4f00&auto=format&fit=crop&w=800&q=80",
        name: "Fritz",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1513350660342-816d92510adf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e157c79b64658eae767177958757c961&auto=format&fit=crop&w=2036&q=80",
        name: "Tedward",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1518887371124-412923b6ccff?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ca7e3d745d3d5d14cad59a77b994de4&auto=format&fit=crop&w=2250&q=80",
        name: "Harriet",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1513904178077-6c5730ddd446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=990f9d48d63f54a2f62ec834c8c88a49&auto=format&fit=crop&w=2250&q=80",
        name: "Buckskin",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-0.3.5&s=f7007b5e33474e6a9a02403d0db403d9&auto=format&fit=crop&w=2250&q=80",
        name: "Twinkle",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1512546148165-e50d714a565a?ixlib=rb-0.3.5&s=2db17e5e9a195da8b6a19fd4b01527ca&auto=format&fit=crop&w=1934&q=80",
        name: "Persnickety",
        price: 2500,
      },
      {
        image_url:
          "https://images.unsplash.com/photo-1455103493930-a116f655b6c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1ddc1fc1799c2f28d379be5f38e33ad&auto=format&fit=crop&w=2251&q=80",
        name: "Pebbles",
        price: 2500,
      },
    ]);
  },
};
