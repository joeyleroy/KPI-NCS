var express     = require('express');
var router      = express.Router();
var orm         = require('orm');
var PDFDocument = require('pdfkit');

// Server start command with nodemon: DEBUG=mypdf:* npm run devstart
// Server start command without nodemon: DEBUG=mypdf:* npm start

var sqlUser = "test";
var sqlPass = "test";
var sqlURL  = "localhost";
var sqlPort = '3306';
var sqlData = "node";
var sqlConn = `mysql://${sqlUser}:${sqlPass}@${sqlURL}:${sqlPort}/${sqlData}`;
// Datatable
var sqlTabl = 'login';

router.use(orm.express(sqlConn, {
  define: function (db, models, next) {
    models.login = db.define(sqlTabl, {
      id          : { type: 'serial', key: true },
      firstname   : String,
      lastname    : String,
      email       : String,
      user        : String,
      password    : String,
      recovery    : String,
    });
    next();
  }
}));

router.post('/login', function(req, res, next) {
  console.log('req.models.login = ' + req.models.login);
  var result = req.models.login.find({
    }, function(error, login) {
      if(error) throw error;
      res.render('login', { login:login, title: `Connected to Database:'${sqlData}' and Accessing Datatable:'${sqlTabl}' ` });
    }
  );
});

router.get('/pdf', function(req, res, next) {
  var id  = req.query.id;
  var result = req.models.login.find( { id: id }, function(error, userd){
    if(error) throw error;
    var id        = userd[0]['id'];
    var firstname = userd[0]['firstname'];
    var lastname  = userd[0]['lastname'];
    var email     = userd[0]['email'];
    var user      = userd[0]['user'];
    var password  = userd[0]['password'];
    var recovery  = userd[0]['recovery'];

    console.log('id = ' + id);

    // get the current date and time
    var myDate = new Date();
    // Turn the current date and time into a local date and time (I don't think this is counting daylight savings)
    var myTime = myDate.toLocaleString();
    // Break out time in pieces
    var myYear = myDate.getFullYear(); // (yyyy)
    var myMonth = myDate.getMonth(); // (0-11)
    var myDay = myDate.getDate(); // (1-31)
    var myHour = myDate.getHours(); // (0-23)
    var myMinutes = myDate.getMinutes(); // (0-59)
    var mySeconds = myDate.getSeconds();
    
    var myAMPM = 'AM';
    if(myHour > 11) {
      myHour = myHour - 11;
      myAMPM = 'PM';
    }

    console.log(`PDF request: ${myHour}:${myMinutes}:${mySeconds}   ${myMonth}/${myDay}/${myYear}   for id: ${id}`);
    
    var myTimeStamp = `This document contained the most recent data as of ${myHour}:${myMinutes} ${myAMPM} on ${myMonth +1}/${myDay}/${myYear}. The data in this document is considered expired and uncontrolled. For the most recent data, generate a new document from the database. © ${myYear} NCS Multistage, LLC All rights reserved.`;
    var Address1 = `World Headquarters
19450 State Hwy 249, Suite 200
Houston, TX 77070
Phone: +1 281.453.2222
Fax: +1 281.652.5846`;
    var Address2 = `Canada Headquarters
800–840, 7 Ave SW
Calgary, AB T2P 3G2
Main Office:  +1 403.984.7674
Central Dispatch: +1 403.720.3236`;
    // Mash-up of database data to rig a filename and Title.
    var title = `${firstname} ${lastname} Login Information`;
    var filename = encodeURIComponent(`${firstname}_${lastname}_${myMonth}-${myDay}-${myYear}-${myHour}-${myMinutes}-${mySeconds}.pdf`);

    // Set up the response with header stuff
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    
    // Margin Measurements. They are veriablitized to make adjustments easier
    var topMargin = 100;
    var bottomMargin = 72;
    var leftMargin = 50;
    var rightMargin = 50;

    // Create a new PDF Document and stick it into the 'doc' variable
    const doc = new PDFDocument( 
      { margins: 
        { top: topMargin,
          bottom: bottomMargin,
          left: leftMargin,
          right: rightMargin
        },
       bufferPages: true
      }
    );

    // Pipes the crafted PDF to write
    doc.pipe(res);

    // currently a calculated value from the id
    var docNumber = `Document # 000${id}`;

    // page sizes used throughout
    var pageHeight = doc.page.height;
    var pageWidth = doc.page.width;

    // Document Body
    // Title
    doc.font('Helvetica', 18)
      .fontSize(18)
      .text(title, { align: 'center' });

    // Email
    doc.moveDown()
      .fontSize(11)
      .text('Email: ', { continued : true })
      .fillColor('blue')
      .text(email, { link: `mailto: ${ email }`, underline: true })
      .fillColor('black');

    // User
    doc.moveDown()
      .text('User: ', { continued : true })
      .fillColor('red')
      .text(user)
      .fillColor('black');

    // Password
    doc.moveDown()
      .fillColor('black')
      .text(`Password: ${ password }`);

    // Recovery
    doc.moveDown()
      .text(`Recovery: ${ recovery }`);
    
    // Lorem for placeholder/test content
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit ' +
        'purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere '

    // Some Lorem
    doc.moveDown()
      .fillColor('black')
      .text(`Lorem: ${ lorem }`);

    // Some more Lorem
    doc.moveDown()
      .fillColor('black')
      .text(`Lorem: ${ lorem }`);

    // Even more Lorem
    doc.moveDown()
      .fillColor('black')
      .text(`Lorem: ${ lorem }`);

    // Document Header and Footer
    // Assign the buffered pages to the range variable.
    const range = doc.bufferedPageRange();

    // Count pages and loop through each to apply Header and Footer
    // First page has Header and Footer in this code. Adjust code if first page should be without.
    for(let i = range.start; i < (range.start + range.count); i++) {
      doc.switchToPage(i);
      // Header
      // Left Side Logo / Center Address / Right Side Document Number
      doc.image('core/images/NCSMultistageLogo.png', leftMargin, 20, { width: 70 })
        .fontSize(7)
        .text(Address1, leftMargin + 80, 20, { width: 120, height: 75 })
        .text(Address2, leftMargin + 190, 20, { width: 120, height: 75 })
        .text(docNumber,
          pageWidth - (doc.widthOfString(docNumber) + rightMargin),
          20,
          { width: doc.widthOfString(docNumber), height: 25 });
      // Footer
      // Left Side Document Title
      doc.fontSize(9).text(title, leftMargin, pageHeight - 50, { height : 25, width : 200 });
      // Center Time Stamp
      doc.fontSize(7).text(myTimeStamp, leftMargin, pageHeight - 30, { height : 50, width : pageWidth - (leftMargin + rightMargin), align: 'center' });

      // Right Side Page Numbers - applies ONLY IF there is more than 1 page
      if(range.count > 1) {
        doc.fontSize(9).text(`Page ${ i + 1 } of ${ range.count }`,
          pageWidth - (doc.widthOfString(`Page ${ i + 1 } of ${ range.count }`) + rightMargin),
          pageHeight - 50,
          { height : 25, width : 200 });
      }
    }
    // Document Write (drops buffered pages)
    doc.end();
  });
});
module.exports = router;