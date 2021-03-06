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
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLazX3dGTP.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 500;
          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 500;
          src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnZKveQhf6Xl7Gl3LX.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 700;
          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eRhf6Xl7Glw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 700;
          src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnLK3eQhf6Xl7Gl3LX.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 800;
          src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eRhf6Xl7Glw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
  
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 800;
          src: local('Fira Sans ExtraBold'), local('FiraSans-ExtraBold'), url(https://fonts.gstatic.com/s/firasans/v8/va9B4kDNxMZdWfMOD5VnMK7eQhf6Xl7Gl3LX.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
      }
  
      #outlook a {
        padding: 0;
      }
  
      .ReadMsgBody,
      .ExternalClass {
        width: 100%;
      }
  
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass td,
      .ExternalClass div,
      .ExternalClass span,
      .ExternalClass font {
        line-height: 100%;
      }
  
      div[style*="margin: 14px 0"],
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }
  
      table,
      td {
        mso-table-lspace: 0;
        mso-table-rspace: 0;
      }
  
      table,
      tr,
      td {
        border-collapse: collapse;
      }
  
      body,
      td,
      th,
      p,
      div,
      li,
      a,
      span {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        mso-line-height-rule: exactly;
      }
  
      img {
        border: 0;
        outline: none;
        line-height: 100%;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
  
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
      }
  
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        -webkit-font-smoothing: antialiased;
      }
  
      .pc-gmail-fix {
        display: none;
        display: none !important;
      }
  
      @media screen and (min-width: 621px) {
        .pc-email-container {
          width: 620px !important;
        }
      }
  
      @media screen and (max-width:620px) {
        .pc-sm-p-24-20-30 {
          padding: 24px 20px 30px !important
        }
  
        .pc-sm-mw-100pc {
          max-width: 100% !important
        }
  
        .pc-sm-ta-center {
          text-align: center !important
        }
  
        .pc-sm-p-35-30 {
          padding: 35px 30px !important
        }
      }
  
      @media screen and (max-width:525px) {
        .pc-xs-p-15-10-20 {
          padding: 15px 10px 20px !important
        }
  
        .pc-xs-h-100 {
          height: 100px !important
        }
  
        .pc-xs-br-disabled br {
          display: none !important
        }
  
        .pc-xs-fs-30 {
          font-size: 30px !important
        }
  
        .pc-xs-lh-42 {
          line-height: 42px !important
        }
  
        .pc-xs-p-25-20 {
          padding: 25px 20px !important
        }
      }
    </style>
    <!--[if mso]>
          <style type="text/css">
              .pc-fb-font {
                  font-family: Helvetica, Arial, sans-serif !important;
              }
          </style>
          <![endif]-->
    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
  </head>
  
  <body
    style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"
    class="">
    <span
      style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Welcome
      to orsity</span>
    <table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0"
      role="presentation" style="background-color: #f4f4f4; table-layout: fixed;">
      <tbody>
        <tr>
          <td class="pc-email-body-inner" align="center" valign="top">
            <!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" src="" color="#f4f4f4"/>
                  </v:background>
                  <![endif]-->
            <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
            <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
              role="presentation" style="margin: 0 auto; max-width: 620px;">
              <tbody>
                <tr>
                  <td align="left" valign="top" style="padding: 0 10px;">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- BEGIN MODULE: Header 1 -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td background="images/header-1-image-1.jpg" bgcolor="#1B1B1B" align="center" valign="top"
                            style="background-color: #1B1B1B; background-image: url('images/header-1-image-1.jpg'); background-position: top center; background-size: cover; border-radius: 8px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)">
                            <!--[if gte mso 9]>
                  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                      <v:fill type="frame" src="images/header-1-image-1.jpg" color="#1B1B1B"></v:fill>
                      <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                          <div style="font-size: 0; line-height: 0;">
                              <table width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center">
                                  <tr>
                                      <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <tr>
                                                  <td colspan="3" height="24" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                                  <td valign="top" align="left">
                  <![endif]-->
                            <!--[if !gte mso 9]><!-->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-sm-p-24-20-30 pc-xs-p-15-10-20" style="padding: 24px 30px 40px;"
                                    valign="top">
                                    <!--<![endif]-->
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td style="font-size: 0;" valign="top">
                                            <!--[if (gte mso 9)|(IE)]><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="255" valign="middle"><![endif]-->
                                            <div class="pc-sm-mw-100pc"
                                              style="display: inline-block; width: 100%; max-width: 255px; vertical-align: middle;">
                                              <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                                role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td class="pc-sm-ta-center" valign="top" style="padding: 10px;">
                                                      <a href="https://checkdc-front-cdb53.firebaseapp.com/" style="text-decoration: none;"><img
                                                          src="https://checkdc-front-cdb53.firebaseapp.com/img/drug.svg"
                                                          width="50" height="50" alt=""
                                                          style="max-width: 100%; height: auto; border: 0; line-height: 100%; outline: 0; -ms-interpolation-mode: bicubic; font-size: 14px; color: #ffffff;"></a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                            <!--[if (gte mso 9)|(IE)]></td><td width="285" valign="middle"><![endif]-->
                                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                          </td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-xs-h-100" height="135" style="line-height: 1px; font-size: 1px;">
                                            &nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td class="pc-fb-font" style="padding: 0 10px;" valign="top">
                                            <a
                                              style="text-decoration: none; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #ffffff;">${moment(Date.now()).format('LLL')}</a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font"
                                            style="padding: 13px 10px 0; letter-spacing: -0.7px; line-height: 46px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; color: #ffffff;"
                                            valign="top"> Prescription Reminder</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if !gte mso 9]><!-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- END MODULE: Header 1 -->
                    <!-- BEGIN MODULE: Call to Action 1 -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                      <tbody>
                        <tr>
                          <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                      <tbody>
                        <tr>
                          <td class="pc-sm-p-35-30 pc-xs-p-25-20"
                            style="padding: 40px 30px 32px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
                            valign="top" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #000 !important;;"
                                    valign="top">Dear ${data.createdFor.fullname}</td>
                                </tr>
                                <tr>
                                  <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td class="pc-fb-font"
                                    style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #000;"
                                    valign="top"><br>
                                    <p>This is reminder that  about time for you to use your prescription with the following details: </p>
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
                                        Interval: Every ${data.prescription.interval} ${data.prescription.interval > 1 ?
        'hours' : 'hour'}
                                      </li>
                                      <li>
                                        Description: ${data.prescription.desc}
                                      </li>
                                    </ul>
                                    <p>Please note that we are sending you this reminder at exacly 5 minutes before your actual use time, this is to make sure you are fully aware and get your self prepared beforen time.</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td height="11" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td style="font-size: 0; text-align: center;" valign="top">
  
                                    <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                                    <div style="display: inline-block; vertical-align: top;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                        <tbody>
                                          <tr>
                                            <td style="padding: 8px;" valign="top">
                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="padding: 13px 17px; border-radius: 8px; background-color: #36B0FF;"
                                                      bgcolor="#36B0FF" valign="top" align="center">
                                                      <a class="pc-fb-font" href="https://checkdc-front-cdb53.firebaseapp.com/"
                                                        style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">&nbsp;<span> Click to login to confirm timing and mark this prescription reminder as used</span></a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- END MODULE: Call to Action 1 -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tbody>
                        <tr>
                          <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Fix for Gmail on iOS -->
    <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
  </body>
  
  </html>`
  }
}