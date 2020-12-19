var express = require("express")
var router = express.Router()
var uuid = require("node-uuid")
const DBTodo = require("../model/todos")
// const redis = require("redis")
// const client = redis.createClient()

// const todos = [
//   {
//     id: uuid.v4(),
//     name: "ruizhi",
//     title: "Take out the trash",
//     completed: false
//   },
//   {
//     id: uuid.v4(),
//     name: "ruizhi",
//     title: "Dinner with wife",
//     completed: false
//   },
//   {
//     id: uuid.v4(),
//     name: "ruizhi",
//     title: "finish DevOps midterm",
//     completed: false
//   }
// ]

// const todos = DBTodo.find().then(result => {
//   console.log(result)
// })

/* GET users listing. */
router.get("/", function (req, res, next) {
  //=======read file========
  // var filePath = path.join(__dirname, "../public/todos.csv")
  // var content = fs.readFileSync(filePath, "utf-8")
  // res.json(content)

  try {
    DBTodo.find()
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
  }

  // res.json(todos)
})

//=======delete items======
router.delete("/:id", (req, res) => {
  // console.log(req.params.id)
  // console.log(typeof req.params.id)
  // console.log(DBTodo.find({ id: req.params.id }))
  DBTodo.deleteOne({ id: req.params.id }).then(function (err) {
    if (err) console.log(err)
    console.log("Successful deletion")
  })

  res.json({
    id: req.params.id
  })
})

//=======add items=========
router.post("/", (req, res) => {
  const newTodo = new DBTodo({
    id: uuid.v4(),
    name: req.body.name,
    title: req.body.title,
    completed: req.body.completed
  })

  // try {
  //   if (client) {
  //     client.set(newTodo.id, JSON.stringify(newTodo))
  //   }
  // } catch (err) {
  //   console.log(err)
  // }

  // const timer = () => {
  //   client.keys("*", function (err, keys) {
  //     keys.forEach(k => {
  //       client.get(k, (errs, value) => {
  //         if (errs) console.log(errs)
  //         const data = JSON.parse(value)
  //         // store data
  //         new DBTodo(data).save()
  //         client.del(k)
  //       })
  //     })
  //   })
  // // }

  // setInterval(() => {
  //   timer()
  // }, 1000 * 10)

  if (!newTodo.title) {
    return res.status(400).json({ msg: "please add a title" })
  }
  newTodo
    .save()
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })

  // todos.push(newTodo)
  res.json(newTodo)
})

module.exports = router
