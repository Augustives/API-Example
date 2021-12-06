const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.taskCreate = async (req, res, next) => {
  try {
    await prisma.task.create({
      data: {
        title: req.body.title,
        authorId: req.user.id
      }
    })

    res.status(201).json({
      message: 'Task created'
    })
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to create a task'
    })
  }
}

exports.taskGetAll = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        authorId: req.user.id
      },
    });

    res.json({
      message: 'Returned all tasks successfully',
      data: tasks
    })
  } catch(err) {
    res.status(500).json({
      error: err
    })
  }
}

exports.taskById = async (req, res, next) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: req.params.taskId
      }
    })
    res.status(200).json({
      message: 'Returned task successfully',
      data: task
    });
  } catch(err)  {
    res.status(500).json({
      error: err
    })
  }
}

exports.taskDelete = async (req, res, next) => {
  try {
    await prisma.task.delete({
      where: {
        id: req.params.taskId
      }
    })
    res.status(200).json({
      message: 'Task deleted'
    });
  } catch(err)  {
    res.status(500).json({
      error: err
    })
  }
}