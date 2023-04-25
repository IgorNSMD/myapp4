var express = require('express');
const { Sequelize } = require('sequelize');
var Task = require('../models/task');


var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//  //console.log('carga index...')
//   res.render('index', { title: 'Express - MySQL - Connect DB..Azure..' });
// });


/* GET home page. */
router.get('/', async function(req, res, next) {

  try {
    const currentTasks = await Task.findAll({
      where: {
          completed: false
      }    
    });
    //console.log(currentTasks);
    const completedTasks = await Task.findAll({
      where: {
          completed: true
      }    
    });  
    //console.log(completedTasks);
    const total = await Task.count();
    const total_currentTasks = await Task.count({ where: { completed: false } });
    const total_completedTasks = await Task.count({ where: { completed: true } });
    //console.log(total);
    console.log(`Total tasks: ${total}   Current tasks: ${total_currentTasks}    Completed tasks:  ${total_completedTasks}`)
    res.render('index', { currentTasks: currentTasks, completedTasks: completedTasks });
  } catch (err) {
    console.log(err);
    res.send('Sorry! Something went wrong.');    
  }



  // const [ currentTasks ] = await Promise.all([ 
  //     Task.findAll({ 
  //       where: {
  //           categoryid: false
  //       }
  //   })
  // ])


 
});

router.post('/addTask', async function(req, res, next) {

  const taskName = req.body.taskName;
  const createDate = Date.now();
  const createdAt = Date.now();
  const updatedAt = Date.now();

  console.log(`Adding a new task ${taskName} - createDate ${createDate}`)

  try {

    const task = await Task.create({taskName, createDate, createdAt, updatedAt})
    console.log(`Added new task ${taskName} - createDate ${createDate}`)        
    res.redirect('/');    
  
  } catch (error) {
      console.log(err);
      res.send('Sorry! Something went wrong.');
  }
});

router.post('/completeTask', async function(req, res, next) {
  console.log("I am in the PUT method")
  const taskId = req.body.id;
  const completed = true
  const completedDate = Date.now();
  
  console.log("taskId -> " + taskId)

  const task = await Task.findOne( {where: { id: taskId } } )

  task.set({
    completed,
    completedDate
  })

  try {
    await task.save()  
    console.log(`Completed task ${taskId}`)
    res.redirect('/');    
  } catch (err) {
    console.log(err);
    res.send('Sorry! Something went wrong.');    
  }
});

router.post('/deleteTask', async function(req, res, next) {
  
  const taskId = req.body.id;
  const completedDate = Date.now();
  const task = await Task.findOne( {where: { id: taskId } } )

  try {
    await task.destroy()
    console.log(`Deleted task $(taskId)`)      
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('Sorry! Something went wrong.');    
  }

});

module.exports = router;

