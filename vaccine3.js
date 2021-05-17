const https = require('https');
var getJSON = require('get-json')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '<email>',
        pass: '<pass>'
    }
});
log = "";
counter = 0;
const schedule = require('node-schedule');


const job = schedule.scheduleJob('*/2 * * * *', function () {
    counter = counter + 1;

    console.log('Hare Krishna, Hare Rama ' + counter);

    var date = formatDate(new Date());
    var tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow = formatDate(tomorrow);

    var urls = [];
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=141&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=143&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=142&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=150&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=144&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=147&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=146&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=193&date=' + date);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=199&date=' + date);


    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=141&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=143&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=142&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=150&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=144&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=147&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=146&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=193&date=' + tomorrow);
    urls.push('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=199&date=' + tomorrow);

    

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    }

    urls.forEach(url => {
        getJSON(url, function (error, response) {
            let sessions = response.sessions ? response.sessions : [];
            for (let i = 0; i < sessions.length; i++) {
                if (sessions[i].min_age_limit === 18 && sessions[i].available_capacity_dose1 > 0 && sessions[i].vaccine === "COVAXIN") {
                    console.log("Session Available for below : total " + sessions[i].available_capacity_dose1 + " slots ");
                    console.log(sessions[i].date);
                    console.log(sessions[i].state_name);
                    console.log(sessions[i].district_name);
                    console.log(sessions[i].name);
                    console.log(sessions[i].pincode);
                    console.log("=================================");

                    log = log + "<h3>Session Available for below : Total " + sessions[i].available_capacity_dose1 + " slot(s)  </h3>";
                    log = log + "<h4>" + "DATE: " + sessions[i].date + ' \ ';
                    log = log + "<h4>" + "STATE: " + sessions[i].state_name + ' \ ';
                    log = log + "<h4>" + "DISTRICT: " + sessions[i].district_name + ' \ ';
                    log = log + "<h4>" + "NAME: " + sessions[i].name + ' \ ';
                    log = log + "<h4>" + "PINCODE: " + sessions[i].pincode + ' \ ';
                    log = log + "<h4>" + "AGE: " + sessions[i].min_age_limit;
                    log = log + "<hr>";

                }
            }
            // console.log(response.sessions.length);
        });
    });

    setTimeout(sendMail, 2000);


    function sendMail() {
        if (log != "") {
            console.log('sending mail');
            var mailOptions = {
                from: '<email>',
                to: '<email>',
                subject: 'Vaccine Notification from Rohit script',
                // text: log
                html: "<br><span style='color:grey'>Made with love by Rohit Aneja</span>" + log + "<br><span style='color:grey'>Made with love by Rohit Aneja</span>"
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            // ====================================================================================================================
            var mailOptions = {
                from: '<email>',
                to: '<email>',
                subject: 'Vaccine Notification from Rohit script',
                // text: log
                html: "<br><span style='color:grey'>Made with love by Rohit Aneja</span>" + log + "<br><span style='color:grey'>Made with love by Rohit Aneja</span>"
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            // =================================================================================================================================
            var mailOptions = {
                from: '<email>',
                to: '<email>',
                subject: 'Vaccine Notification from Rohit script',
                // text: log
                html: "<br><span style='color:grey'>Made with love by Rohit Aneja</span>" + log + "<br><span style='color:grey'>Made with love by Rohit Aneja</span>"
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        console.log(log);

    }



    var mailOptions = {
        from: '<email>',
        to: '<email>',
        subject: 'Script Health Update',
        html: "<h1>script runs fine! Counter : </h1>" + counter
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent for health check of app: ' + info.response);
        }
    });

});




