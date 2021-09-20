var e = Error
function onEdit (e) {
  var debug_e = {
    authMode:  e.authMode,  
    range:  e.range.getA1Notation(),    
    source:  e.source.getId(),
    user:  e.user,   
    value:  e.value,
    oldValue: e. oldValue
  }

  console.log({message: 'onEdit() Event Object', eventObject: debug_e});
}

function CreateSMS() 
{
  
  var spreadSheet = SpreadsheetApp.openByUrl(SpreadsheetApp.getActiveSpreadsheet().getUrl());
  var sheet = spreadSheet.getSheets()[0];
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
  
  // loop to read data from all the rows
  for (var i in range) {
    if (range[i][1] == '' || range[i][3] == 'SENT') continue;
    var state = sheet.getRange(2+Number(i), 4);
    var info = sheet.getRange(2+Number(i), 5);
    var sendState = sheet.getRange(2+Number(i), 6);
       
    try {
      
     var messages_url = "https://api.letexto.com/v1/campaigns";

  var payload = {
    "step":null,
    "sender":"DECATHLON",
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
    "recipients":[{"phone":"2250"+ range[i][1],}],
    "sendAt":[],
    "dlrUrl":"http://dlr.my.domain.com",
    "responseUrl":"http://res.my.domain.com"
  };

  var payload_new = JSON.stringify(payload);  
  
  var headers = { 
    "Authorization" : 'Bearer 9f1dc3c02d9d09efbe157f5a2a0881',
  };
  
  var options = {
    "method" : "POST",
    "headers":headers,
    "payload" : payload_new,
    "contentType" : "application/json",
    
  };  
  
 var response = UrlFetchApp.fetch(messages_url, options);  
 Logger.log(response);  
 Logger.log('Send ID' + sendID);  
      state.setValue('SENT').setBackground('#93c47d');
      info.setValue('Sent on ' + new Date());
      sendState.setValue('YES');
    
    } catch (err) {
      state.setValue('FAILED').setBackground('#e06666');
      info.setValue(String(err).replace('\n', ''));
    }
  }

  
  
}

function SendSMS() 
{
 var smsid ='a522213ca70f4fd881288e96c39f0f84' ;
var yada = UrlFetchApp.fetch('https://api.letexto.com/v1/campaigns/'+ smsid +'/schedules', {
  method: 'POST',
  headers: {
    'Authorization':'9f1dc3c02d9d09efbe157f5a2a0881',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(yada),

}

)
response = JSON.stringify(yada);
Logger.log(yada)
}