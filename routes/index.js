var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var moment = require('moment')
var jwt = require('jsonwebtoken')
var appDetails = require('../config/appdetails.json')
const User = require('../models/userModel');
const Prescription = require('../models/prescriptionModel')
const Reminder = require('../models/ReminderModel')
var cron = require('node-cron');
const emailTemplate = require('../emailtemplate/index')
var nodemailer = require('nodemailer');

var client = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS
  }
});

// auth
function auth(req, res, next) {
  var token = req.header("authorization");
  if (token) {
    var data = jwt.decode(token, appDetails.jwtSecret);
    next();
  } else {
    res.status(400).json({
      err: "Please login to continue"
    })
  }
}

// manipulate time
function getRoundedTime(time) {
  var mainFormat = moment(time)
  var secs = mainFormat.second()
  var justMinutes = mainFormat.subtract(secs, 'seconds')
  var remainder = 1 - (justMinutes.minute() % 1);
  var dateTime = moment(justMinutes).add(remainder, "minutes")
  var final = dateTime.format()
  return final
}

function getRoundedTimeAndSubtract(time) {
  var mainFormat = moment(time)
  var secs = mainFormat.second()
  var justMinutes = mainFormat.subtract(secs, 'seconds')
  var remainder = 1 - (justMinutes.minute() % 1);
  var dateTime = moment(justMinutes).add(remainder, 'minutes').subtract(5, 'minutes')
  var final = dateTime.format()
  return final
}

function addIntervalToTime(time, interval) {
  var mainFormat = moment(time)
  var add = mainFormat.add(interval, 'hours')
  var final = moment(add).format()
  return final
}

// job sheeduler for reminder
cron.schedule('* * * * *', () => {
  console.log(`running at ....${getRoundedTime(Date.now())}`)
  Prescription.find({ completed: false, deleted: false })
    .populate('createdBy')
    .then((data) => {
      if (data.length > 0) {
        data.map((prescription) => {
          let createdFor = prescription.createdBy._id
          let prescriptionId = prescription._id
          let interval = prescription.interval
          let oldTime = prescription.nextReminder
          if (getRoundedTime(Date.now()) === getRoundedTimeAndSubtract(oldTime)) {
            Prescription.findByIdAndUpdate({ _id: prescriptionId }, {
              nextReminder: addIntervalToTime(oldTime, interval)
            },
              {
                new: true
              }
            ).then((data) => {
              Reminder.create({
                timetoUse: getRoundedTime(oldTime),
                createdFor,
                prescription: prescriptionId,
                createdAt: Date.now(),
              }).then((data) => {
                Reminder.findOne({ _id: data._id })
                  .populate('createdFor')
                  .populate('prescription')
                  .then((data) => {
                    const sendEmail = {
                      from: 'Check-dc Prescripton Reminder <bellohargbola13@gmail.com>',
                      to: data.createdFor.email,
                      subject: 'Check-dc Prescripton Reminder',
                      html: emailTemplate.reminder(data)
                    };
                    client.sendMail(sendEmail, function (err, info) {
                      if (err) {
                        console.log(err);
                      }
                      else {
                        console.log('Message sent: ' + info.response);
                      }
                    });
                  }).catch((err) => {
                    console.log(err)
                  })
              }).catch((err) => {
                console.log(err)
              })
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      }
    }).catch((err) => {
      console.log(err)
    })
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// auth route
router.post('/api/signup', function (req, res, next) {
  const { fullname, email, password, phone } = req.body
  User.findOne({ email }).then((data) => {
    if (data !== null) {
      res.status(400).send({
        err: 'Email already exists'
      })
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          fullname,
          email,
          password: hash
        }).then((data) => {
          res.status(200).send({
            success: true,
            message: 'User created successfully! You can now login.'
          })
        }).catch((err) => {
          res.status(400).send({
            err: 'Something went wrong!'
          })
        })
      }).catch((err) => {
        res.status(400).send({
          err: 'Something went wrong!'
        })
      })
    }
  }).catch((err) => {
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
});

router.post('/api/signin', function (req, res, next) {
  const { email, password } = req.body
  User.findOne({ email }).then((data) => {
    if (data !== null) {
      bcrypt.compare(password, data.password).then((valid) => {
        if (valid) {
          data.password = null
          var token = jwt.sign(JSON.stringify(data), appDetails.jwtSecret)
          res.status(200).send({
            success: true,
            message: 'User authenticated successfully',
            token
          })
        } else {
          res.status(400).send({
            err: 'Incorrect password!'
          })
        }
      }).catch((err) => {
        res.status(400).send({
          err: 'Something went wrong!'
        })
      })
    } else {
      res.status(400).send({
        err: 'User does not exists!'
      })
    }
  }).catch((err) => {
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
});

// update user routes
router.post('/api/updateprofile', auth, function (req, res, next) {
  const { email, fullname } = req.body
  User.findOne({ email }).then((data) => {
    if (data !== null) {
      User.findByIdAndUpdate({ _id: data._id }, {
        fullname,
      },
        {
          new: true
        }).then((data) => {
          data.password = null
          res.status(200).send({
            success: true,
            message: 'User profile updated successfully!',
            data
          })
        }).catch((err) => {
          console.log(err)
          res.status(400).send({
            err: 'Something went wrong!'
          })
        })
    } else {
      res.status(400).send({
        err: 'Something went wrong!'
      })
    }
  }).catch((err) => {
    console.log(err)
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
});

router.post('/api/updatepassword', auth, function (req, res, next) {
  const { password, email, newpassword } = req.body
  User.findOne({ email }).then((data) => {
    if (data !== null) {
      bcrypt.compare(password, data.password).then((valid) => {
        if (valid) {
          if (password === newpassword) {
            res.status(400).send({
              err: 'Old password must not be the same as new password!'
            })
          } else {
            bcrypt.hash(newpassword, 10).then((hash) => {
              var lastestPassword = hash
              User.findByIdAndUpdate({ _id: data._id }, {
                password: lastestPassword
              }).then((data) => {
                res.status(200).send({
                  success: true,
                  message: 'User password updated successfully!'
                })
              }).catch((err) => {
                console.log(err)
                res.status(400).send({
                  err: 'Something went wrong!'
                })
              })
            }).catch((err) => {
              res.status(400).send({
                err: 'Something went wrong!'
              })
            })
          }
        } else {
          res.status(400).send({
            err: 'Incorrect old password!'
          })
        }
      }).catch((err) => {
        res.status(400).send({
          err: 'Something went wrong!'
        })
      })
    } else {
      res.status(400).send({
        err: 'Something went wrong!'
      })
    }
  }).catch((err) => {
    console.log(err)
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
});

// prescription
router.post('/api/createprescription', auth, function (req, res, next) {
  const { createdBy, desc, formula, interval, name, brandname, startTime, nextReminder } = req.body
  var slug = name.toLowerCase().replace(/[' '|&|,|(|)|&|@|!|%|^|+|=]/gi,"-")
  Prescription.find({ createdBy, slug }).then((data) => {
    if (data.length === 0) {
      Prescription.create({
        createdBy,
        createdAt: Date.now(),
        desc,
        formula,
        interval,
        name,
        brandname,
        startTime,
        nextReminder,
        slug
      }).then((data) => {
        res.status(200).send({
          success: true,
          message: 'Prescription created successfully',
        })
      }).catch((err) => {
        res.status(400).send({
          err: 'Something went wrong!'
        })
      })
    } else {
      var checkIfAllDeleted = data.every((item) => item.deleted === true)
      if(checkIfAllDeleted) {
        Prescription.create({
          createdBy,
          createdAt: Date.now(),
          desc,
          formula,
          interval,
          name,
          brandname,
          startTime,
          nextReminder,
          slug
        }).then((data) => {
          res.status(200).send({
            success: true,
            message: 'Prescription created successfully',
          })
        }).catch((err) => {
          res.status(400).send({
            err: 'Something went wrong!'
          })
        })
      } else {
        res.status(400).send({
          err: 'Product name already exists'
        })
      }
    }
  }).catch((err) => {
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
});

router.get('/api/getprescriptions', auth, (req, res, next) => {
  const { userId } = req.query
  Prescription.find({ createdBy: userId }).then((data) => {
    res.status(200).send({
      success: true,
      data
    })
  }).catch((err) => {
    res.status(400).send({
      err
    })
  })
})


router.post('/api/deleteprescription', auth, function (req, res, next) {
  const { presId } = req.body
  Prescription.findByIdAndUpdate({ _id: presId }, {
    deleted: true
  }).then((data) => {
    res.status(200).send({
      success: true,
      message: 'Prescription deleted successfully!'
    })
  }).catch((err) => {
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
})

router.post('/api/completeprescription', auth, function (req, res, next) {
  const { presId } = req.body
  Prescription.findByIdAndUpdate({ _id: presId }, {
    completed: true
  }).then((data) => {
    res.status(200).send({
      success: true,
      message: 'Prescription updated successfully!'
    })
  }).catch((err) => {
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
})

// reminders
router.get('/api/getreminders', auth, (req, res, next) => {
  const { userId } = req.query
  Reminder.find({ createdFor: userId })
    .populate('prescription')
    .then((data) => {
      res.status(200).send({
        success: true,
        data
      })
    }).catch((err) => {
      res.status(400).send({
        err
      })
    })
})

router.post('/api/markreminder', auth, function (req, res, next) {
  const { presId } = req.body
  Reminder.findByIdAndUpdate({ _id: presId }, {
    used: true
  }).then((data) => {
    res.status(200).send({
      success: true,
      message: 'Reminder maked as used successfully!'
    })
  }).catch((err) => {
    res.status(400).send({
      err: 'Something went wrong!'
    })
  })
})

module.exports = router;
