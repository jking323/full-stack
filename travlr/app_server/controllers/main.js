const index = (fetch, res) => {
  res.render("index", { title: "Travlr Getaways" });
};

module.exports = {
  index,
};
