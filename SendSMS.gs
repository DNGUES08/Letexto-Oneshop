function SendSMS() 
{

  var spreadSheet = SpreadsheetApp.openByUrl(SpreadsheetApp.getActiveSpreadsheet().getUrl());
  var sheet = spreadSheet.getSheets()[0];
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
  
  // loop to read data from all the rows
  for (var i in range) {
    if (range[i][1] == '' || range[i][3] == 'SENT') continue;
    var state = sheet.getRange(2+Number(i), 4);
    var info = sheet.getRange(2+Number(i), 5);
       
    try {
      
     var messages_url = "https://api.letexto.com/v1/campaigns";

  var payload = {
    "step":null,
    "sender":"DECATHON CI",
    "name":"Sport",
    "campaignType":"SIMPLE",
    "recipientSource":"CUSTOM",
    "groupId":null,
    "filename":null,
    "message":'Hello',
    "saveAsModel":false,
    "destination":"NAT_INTER",
    "message":range[i][2],
    "emailText":null,
    "recipients":[{"phone":"+"+ range[i][1],}],
    "sendAt":[],
    "dlrUrl":"http://dlr.my.domain.com",
    "responseUrl":"http://res.my.domain.com"
  };

  var payload_new = JSON.stringify(payload);  
  
  var headers = { 
    "Authorization" : 'Bearer f1dc3c02d9d09efbe157f5a2a0881',
  };
  
  var options = {
    "method" : "POST",
    "headers":headers,
    "payload" : payload_new,
    "contentType" : "application/json",
    
  };  
  
  UrlFetchApp.fetch(messages_url, options);      
     
      state.setValue('SENT').setBackground('#93c47d');
      info.setValue('Sent on ' + new Date());
    } catch (err) {
      state.setValue('FAILED').setBackground('#e06666');
      info.setValue(String(err).replace('\n', ''));
    }
  }
}