const express = require('express');
const router = express.Router();
const data = require('../db/data.json');
const Car = require('./handlers/car');
const deleteMiddleware = require('./middlewares/delete-authorization');

//@router POST /car
router.post('/', (req,res) => {
  const newCar = new Car(req.body);
  const car = data.find((car) => car.brand === newCar.brand);
    if(car) {
      return res.status(409).json({message: "Car already exists."});
    } else {
      data.push(newCar);
      return res.status(201).json(newCar);
    }
});

//@router GET /car
router.get('/', (req,res) => {
  res.json(data);
});

//@router GET /car/:id
router.get('/:id', (req,res) => {
  const id = req.params.id;
  const car = data.find((car) => car.id == id);
  if(car) {
    return res.status(200).json(car);
  } else {
    return res.status(404).json({message: "There is no car with such id"});
  }
});

//@router PUT /car/:id
router.put('/:id', (req,res) => {
  const id = req.params.id;
  const updatedCar = req.body;
  const carIndex = data.findIndex((car) => car.id == id);
  const car = data[carIndex];
  if(car) {
    data.splice(carIndex, 1, {...car, ...updatedCar});
    return res.status(200).json({...car, ...updatedCar});
  } else {
    return res.status(404).json({message: "Car with such id has not been found"});
  }
});

//@router DELETE /car/:id
router.delete('/:id',deleteMiddleware, (req,res) => {
  const id = req.params.id;
  const carIndex = data.findIndex((car) => car.id == id);

  if(~carIndex) {
    data.splice(carIndex, 1);
    return res.status(200).json({message: "The car has been successfully removed"})
  } else {
    return res.status(404).json({message: "Car with such id has not been found"});
  }
});


module.exports = router;
