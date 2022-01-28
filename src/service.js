const Restaurant = require("./models/Restaurant");

class Service {
  constructor() {}
  getRestaurants = async (req, res) => {
    // send back an array of restaurants\
    const r = await Restaurant.find();
    res.send(r);
  };
  addRestaurant = async (req, res) => {
    // get the new restaurant properties
    const newRestaurant = await Restaurant.create(req.body);

    // send back the new restaurant as a 201 response
    res.code(201).send(newRestaurant);
  };
  getRestaurant = async (req, res) => {
    // get that id from params
    const { id } = req.params;
    // find the restaurant

    const restaurant = await Restaurant.findById(id);

    // return the restuant  (if exists)
    if (restaurant) {
      res.send(restaurant);
    } else {
      // return 404 not found (if not exists)
      res.code(404).send(`No restaurant with id '${id}' found`);
    }
  };
  updateRestaurant = async (req, res) => {
    // get that id from params
    const { id } = req.params;

    // find the restaurant
    const restaurant = await Restaurant.findById(id);

    // return the restuant  (if exists)
    if (restaurant) {
      // update restaurant
      await restaurant.update(req.body);
      res.code(204).send();
    } else {
      // return 404 not found (if not exists)
      res.code(404).send(`No restaurant with id '${id}' found`);
    }
  };
  deleteRestaurant = async (req, res) => {
    // get that id from params
    const { id } = req.params;
    // find the restaurant index
    const restaurant = await Restaurant.findById(id);

    // return the restuant  (if exists)
    if (restaurant) {
      // update restaurant
      await Restaurant.findByIdAndRemove(id);
      res.code(204).send();
    } else {
      // return 404 not found (if not exists)
      res.code(404).send(`No restaurant with id '${id}' found`);
    }
  };
}

module.exports = Service;
