var moment = require('moment')
function getRoundedTime(time) {
  var mainFormat = moment(time)
  var secs = mainFormat.second()
  var justMinutes = mainFormat.subtract(secs, 'seconds')
  var remainder = 1 - (justMinutes.minute() % 1);
  var dateTime = moment(justMinutes).add(remainder, "minutes")
  var final = dateTime.format()
  return final
}
module.exports = {
  reminder: (data) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <style>
        body {
          padding: 0;
          margin: 0;
          font-family: sans-serif !important;
          font-size: 15px;
          background: #f5f5f5;
        }
    
        a {
          text-decoration: none !important;
        }
    
        .main {
          margin: 0px auto;
          width: 35%;
        }
    
        .top {
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
          padding: 1rem 2rem;
          border-radius: 7px;
          background: #000;
          color: #fff;
          margin: 1rem 0px 0px;
        }
    
        .top ul {
          list-style: none;
          float: right;
        }
    
        .top ul a {
          color: #fff;
          text-decoration: none;
        }
    
        .top .email-time {
          margin: 6rem 0px 0px;
        }
    
        .top .subject {
          margin: 0px;
        }
    
        .bottom {
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
          padding: 1rem 2rem;
          border-radius: 7px;
          background: #fff;
          color: #000;
          margin: 0.5rem 0px 0px;
        }
    
        .bottom ul {
          padding-left: 1rem;
        }
    
        .btn {
          color: #fff !important;
          background-color: #1890ff;
          border-color: #1890ff;
          text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
          -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.04);
          padding: 1rem;
          border-radius: 2px;
          font-size: 14px;
        }
    
        @media (max-width: 768px) {
          .main {
            width: 90%;
            margin: 1rem;
          }
        }
    
        @media (min-width: 668px) and (max-width: 899px) {
          .main {
            width: 96%;
            margin: 1rem;
          }
        }
    
        @media (min-width: 1005px) and (max-width: 1251px) {
          .main {
            margin: 0px auto;
            width: 50%;
          }
        }
      </style>
    </head>
    
    <body>
      <div class="main">
        <div class="top">
          <ul>
            <li>
              <a href="/">Login</a>
            </li>
          </ul>
          <p class="email-time">${moment(Date.now()).format('LLL')}</p>
          <h3 class="subject">
            Check-dc Prescription Reminder
          </h3>
        </div>
        <div class="bottom">
          <h4>Dear ${data.createdFor.fullname},</h4>
          <p>This is reminder that its about time for you to use your prescription with the following details: </p>
          <ul>
            <li>
              Product name: ${data.prescription.name}
            </li>
            <li>
              Product name: ${data.prescription.brandname}
            </li>
            <li>
              Usage formular: ${data.prescription.formula}
            </li>
            <li>
              Interval: Every ${data.prescription.interval} ${data.prescription.interval > 1 ? 'hours' : 'hour'}
            </li>
            <li>
              Use Time: ${moment(getRoundedTime(data.timetoUse)).format('LLL')}
            </li>
            <li>
              Next Use Time: ${moment(getRoundedTime(data.prescription.nextReminder)).format('LLL')}
            </li>
            <li>
              Description: ${data.prescription.desc}
            </li>
          </ul>
          <a href="/">
            <button class="btn">
              Click to login to mark the prescription reminder as used
            </button>
          </a>
          <p>Note that we are sendiing you this reminder <b>5 minutes</b> before the actual use time just for you to be at
            altert and not forget when to use.</p>
          <p>Thank you!</p>
    
        </div>
      </div>
    </body>
    
    </html>`
  }
}