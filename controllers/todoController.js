// Import the Post model
const postModel = require("../models/Post");

// Controller to handle home route and display all todos
exports.home = async (req, res) => {
  try {
    const todo = await postModel.find({});
    res.render("index", {
      title: "Home",
      todo,
      errorMessage: undefined, // Pass errorMessage as undefined
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something Went Wrong");
  }
};

// Controller to create a new todo
exports.create = async (req, res) => {
  try {
    let { name, content } = req.body;
    if (!name || !content) {
      return res.status(400).render("index", {
        title: "Home",
        errorMessage: "Fields cannot be empty",
        todo: [],
      });
    }
    await postModel.create({ name, content });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something Went Wrong");
  }
};

// Controller to render the edit page for a specific todo
exports.edit = async (req, res) => {
  try {
    let todo = await postModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.render("edit", { title: "Edit", todo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something Went Wrong");
  }
};

// Controller to update an existing todo
exports.update = async (req, res) => {
  try {
    let { newname, newcontent } = req.body;
    await postModel.findByIdAndUpdate(
      req.params.id,
      {
        name: newname,
        content: newcontent,
      },
      { new: true }
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something Went Wrong");
  }
};

// Controller to delete a specific todo
exports.delete = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something Went Wrong");
  }
};
