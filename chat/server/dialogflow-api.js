const dialogflow = require('dialogflow');

const DialogFlowApi = (() =>{
  const PROJECT_ID = 'sizedetector';
  const LANGUAGE_CODE = 'en-US';
  let sessionClient;

  const init = () => {
    sessionClient = new dialogflow.SessionsClient();
  }

  const sendQuery = (sessionId,query) => {
    const sessionPath = sessionClient.sessionPath(PROJECT_ID, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: LANGUAGE_CODE,
        },
      },
    };
    return new Promise((resolve,reject) => {
      sessionClient
        .detectIntent(request)
        .then(responses => {
          if(!responses){
            reject('No response.');
          }else{
            resp = responses[0];
            resolve({
              intentName: resp.queryResult.intent.name,
              text: resp.queryResult.fulfillmentText,
              data: resp.queryResult.parameters.fields,
            });
          }
        })
        .catch(error => {
          reject(error);
        })
    });

  };
  const test = () => {
        // You can find your project ID in your Dialogflow agent settings
    const projectId = 'sizedetector'; //https://dialogflow.com/docs/agents#settings
    const sessionId = 'quickstart-session-id';
    const query = '1.6m';
    const languageCode = 'en-US';

    // Instantiate a DialogFlow client.
    const dialogflow = require('dialogflow');
    const sessionClient = new dialogflow.SessionsClient();

    // Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };

    // Send request and log result
    sessionClient
      .detectIntent(request)
      .then(responses => {
        console.log(responses);
        console.log('###############################################3');
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  };
  return {
    test,
    init,
    sendQuery,
  }
})();

module.exports = DialogFlowApi;