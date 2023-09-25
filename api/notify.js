let axios = require('axios');

async function notify(req, res) {

    // Unnecessary if you are setting vercel.json
    // res.setHeader('Access-Control-Allow-Credentials', true)
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // // another common pattern
    // // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    // res.setHeader(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }


    console.log("sending notification to")
    console.log(process.env.webhook_url)
    let data = JSON.stringify({
        text: req.body.text
    });

    let config = {
        method: 'post',
        url: process.env.webhook_url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios(config)

    res.status(200).json({
        success: true
    })
}

module.exports = notify
