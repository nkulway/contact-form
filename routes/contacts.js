const router = require("express").Router();
const Sequelize = require("sequelize");
const { User } = require("../models");

router.post("/add", async (req, res) => {
  const { email, name } = req.body;

  const newUser = await User.create({
    email,
    name,
  });

  res.json({
    id: newUser.id,
  });
});

router.get("/add", (req, res) => {
  res.render("contact-form");
});

router.get("/list", async (req, res) => {
    // requesting all of the data from our 'User' database
  const contacts = await User.findAll();
  const html = contacts
    .map((contact) => {
            // isolate the id inside of the list to make them unique "contact.id"
            // diplay names of people from db
      return `<li id="${contact.id}">${contact.name}</li>`;
    })
    .join("");

  res.render("contact-list", {
    locals: {
      contacts: html,
    },
  });
});

router.post("/edit", async (req, res) => {
  const { name, id } = req.body;
  console.log(req.body)
  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });


  res.json({
    message: `You successfully updated ${name}`
  });
});

module.exports = router;



