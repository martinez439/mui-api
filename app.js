'use strict';

require('dotenv').config();

/**
 * Require the dependencies
 * @type {*|createApplication}
 */
const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors')
const OAuthClient = require('intuit-oauth');
const axios = require('axios');
const bodyParser = require('body-parser');
const ngrok = process.env.NGROK_ENABLED === 'true' ? require('ngrok') : null;
//const queryString = require('query-string');

app.use(cors())
/**
 * Configure View and Handlebars
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
//app.engine('html', require('ejs').renderFile);

//app.set('view engine', 'html');
app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * App Variables
 * @type {null}
 */
let oauth2_token_json = null;
let redirectUri = '';

/**
 * Instantiate new Client
 * @type {OAuthClient}
 */

let oauthClient = null;

/**
 * Home Route
 
app.get('/', function (req, res) {
  res.render('index');
});
*/


 


 
 
  app.get('/login', urlencodedParser, function (req, res) {
    oauthClient = new OAuthClient({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      environment: process.env.ENVIRONMENT,
      redirectUri: process.env.REDIRECT_URI,
    });

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: 'intuit-test',
  });
  res.redirect(authUri);
});









// * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
 
app.get('/callback', function (req, res) {
  let uri = process.env.FRONTEND_URI || 'http://localhost:3000/tickets'
  oauthClient
    .createToken(req.url)
    .then(function (authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      res.redirect(uri +'?access_token=' + oauth2_token_json)
      console.log(oauth2_token_json)
    })
    .catch(function (e) {
      console.error(e);
    });
    /*
    axios.post(oauthClient, function(error, res, body) {
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000/tickets'
      res.redirect(uri + '?access_token=' + access_token)
    })
    */

});




/**
 * Display the token : CAUTION : JUST for sample purposes
 */
app.get('/retrieveToken', function (req, res) {
  res.send(oauth2_token_json);
  console.log(oauth2_token_json)
});

/**
 * Refresh the access-token
 */
app.get('/refreshAccessToken', function (req, res) {
  oauthClient
    .refresh()
    .then(function (authResponse) {
     // console.log(`The Refresh Token is  ${JSON.stringify(authResponse.getJson())}`);
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      res.send(oauth2_token_json);
    })
    .catch(function (e) {
      console.error(e);
    });
});

/**
 * getCompanyInfo ()
 */
app.get('/getCompanyInfo', function (req, res) {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({ url: `${url}v3/company/${companyID}/companyinfo/${companyID}` })
    .then(function (authResponse) {
     // console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});


//Profit & Loss call

app.get('/profitloss', function (req, res) {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({ url: `${url}v3/company/${companyID}/reports/ProfitAndLoss` })
    .then(function (authResponse) {
      //console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});



//Read invoice
/*
app.get('/invoice', function (req, res) {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({ url: `${url}v3/company/${companyID}/invoice/130?minorversion=51` })
    .then(function (authResponse) {
      console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});
*/

/**
 * Get the AuthorizeUri
 */
app.get('/authUri', urlencodedParser, function (req, res) {
  oauthClient = new OAuthClient({
    clientId: req.query.json.clientId,
    clientSecret: req.query.json.clientSecret,
    environment: req.query.json.environment,
    redirectUri: req.query.json.redirectUri,
  });

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: 'intuit-test',
  });
  res.send(authUri);
});

//Creating an invoice
/*
app.post('/invoice', urlencodedParser, function (req, res) {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({ url: `${url}v3/company/${companyID}/invoice?minorversion=51` })
    .then(function (authResponse) {
      console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});

*/
/*
//Create Customer
app.post('/customer', urlencodedParser, function (req, res) {
  const companyID = oauthClient.getToken().realmId;
  const token = oauth2_token_json;
  const url =
  oauthClient.environment == 'sandbox'
    ? OAuthClient.environment.sandbox
    : OAuthClient.environment.production;
  const config = {
      headers: { 
        'Authorization': `Bearer ` + `${token}`.toString('base64') }
  };

  axios.post(`${url}v3/company/${companyID}/customer`, { 

    "DisplayName": req.query.CustomerName,
    "Notes": req.query.Notes
  },
  config,

    )
    .then(function (authResponse) {
      console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
        res.send(JSON.parse(authResponse.text()));
      })
      .catch(function (e) {
        console.error(e);
      });

});
*/

//Create Customer
app.post('/customer', urlencodedParser, function (req, res) {
  const companyID = oauthClient.getToken().realmId;
const body = {
  DisplayName: req.body.customer,
  CompanyName: req.body.notes
};

oauthClient
  .makeApiCall({
    url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/customer?minorversion=51`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(function (response) {
    console.log('The API response is  : ' + response);
  })
  .catch(function (e) {
    console.log('The error is ' + JSON.stringify(e));
  });
})



app.post('/createinvoice', urlencodedParser, function (req, res) {
  const companyID = oauthClient.getToken().realmId;
  const body = {
      Line: [
        {
          DetailType: "SalesItemLineDetail", 
          Amount: '5000.0', 
          SalesItemLineDetail: {
            ItemRef: {
              name: "Services", 
              value: "1"
            }
          }
        }
      ], 
      CustomerRef: {
        value: "1"
      }
    };
    

oauthClient
  .makeApiCall({
    url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/invoice?minorversion=51`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(function (response) {
    console.log('The API response is  : ' + response);
  })
  .catch(function (e) {
    console.log('The error is ' + JSON.stringify(e));
  });
})

//Receivables

app.get('/receive', function (req, res) {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == 'sandbox'
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({ url: `${url}v3/company/${companyID}/reports/AgedReceivableDetail` })
    .then(function (authResponse) {
    //  console.log(`The response for API call is :${JSON.stringify(authResponse)}`);
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});

/**
 * disconnect ()
 */
app.get('/disconnect', function (req, res) {
  console.log('The disconnect called ');
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.OpenId, OAuthClient.scopes.Email],
    state: 'intuit-test',
  });
  res.redirect(authUri);
});

/**
 * Start server on HTTP (will use ngrok for HTTPS forwarding)
 */
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`💻 Server listening on port ${server.address().port}`);
  if (!ngrok) {
    redirectUri = `${server.address().port}` + '/callback';
    console.log(
      `💳  Step 1 : Paste this URL in your browser : ` +
        'http://localhost:' +
        `${server.address().port}`,
    );
   
  }
});

/**
 * Optional : If NGROK is enabled
 */
if (ngrok) {
  console.log('NGROK Enabled');
  ngrok
    .connect({ addr: process.env.PORT || 8000 })
    .then((url) => {
      redirectUri = `${url}/callback`;

    })
    .catch(() => {
      process.exit(1);
    });
}