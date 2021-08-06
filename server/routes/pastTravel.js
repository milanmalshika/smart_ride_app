const router = require("express").Router();
const { response } = require("express");
const pool = require("../db");

router.get("/", async(req, res) => {
  try {

      //let id = req.params.passanger_id;

      const rides = await pool.query(
          "SELECT DATE(ride_details.date), ride_details.cost, bus.bus_number FROM ride_details INNER JOIN bus ON ride_details.bus_id=bus.bus_id ORDER BY ride_id DESC"
      );
      
      if (rides.rows.length === 0) {
        return res.status(401).json("No any ride details rates in the database.");
      }
    
      res.json(rides.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:passanger_id", async(req, res) => {
    try {

        let id = req.params.passanger_id;

        const rides = await pool.query(
            "SELECT * FROM ride_details WHERE passanger_id= $1",
            [id]
        );
        
        if (rides.rows.length === 0) {
          return res.status(401).json("No any ride details rates in the database.");
        }
      
        res.json(rides.rows);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;