const CalculationsServiceClass = require('../Services/CalculationsService');
const ReadingsServiceClass = require('../Services/ReadingsService');
const DatesServiceClass = require('../Services/DatesService');
var nodemailer = require('nodemailer');

  class EmailController {
    makeRouteName(routeNameWithoutSlash){
      const prefix = '/api/email';

      return `${prefix}/${routeNameWithoutSlash}`
    }

    async registerRoutes(expressAppInstance, dbConnection){
        const CalculationsService = new CalculationsServiceClass(dbConnection);
        const ReadingsService = new ReadingsServiceClass(dbConnection);
        const DatesService = new DatesServiceClass(dbConnection);

        expressAppInstance.get(this.makeRouteName(''), async (req, res) => {
            try {
                const { month, email} = req.query;
                var sla = await CalculationsService.calculateSLA(await ReadingsService.getReadingsFromMonth(month), month);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'FYPalert2019@gmail.com',
                      pass: 'Password1234!'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'FYPalert2019@gmail.com',
                    to: email,
                    subject: `SLA report for the month: ${month}`,
                    text: `For the month ${month}, our Pi has a ${sla.uptimePercentage}% data transfer.`
                  };

                  console.log("Sending email...");
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                        console.log("email sent!");
                        res.send('Email sent');
                    }
                  });
            } catch(e){
                console.error(e);
            }
        });

    }
}

module.exports = EmailController;