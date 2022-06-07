function main() {
  // load the sheet
  var eventSheet = SpreadsheetApp.getActive().getSheetByName("Events");

  // get the number of rows of data
  var numRows = eventSheet.getLastRow(); 

  // load data in the first two columns from the second row till the last row
  // (the first row has column headers so we don’t want to load it)
  // getRange's inputs: top row, leftmost column, rows in range, columns in range
  var range = eventSheet.getRange(2, 1, numRows - 1, 8).getValues();

  // loop through each row of data
  for(var index in range) {

    // assign variables
    var row = range[index];
    var eventName = row[1];
    var reminderDate = row[6];
    var reminderMessage = row[7] + "\n" + "\n" + "Edit or create reminder events at: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();
    
    // check if the event's reminder date is today
    if(isReminderDateToday(reminderDate)) {
      // if so, trigger an email reminder
      emailReminder(eventName,reminderMessage);
    }
  }
}

// check if the event is is today
function isReminderDateToday(reminderDate) {
  // sometimes GSheets doesn't read dates properly
  // check if reminder date is a string and if so convert it to date
  if(typeof reminderDate === "string")
    reminderDate = new Date(reminderDate);
  // get today's date
  var today = new Date();
  // compare the date and month of today vs. the reminder date
  if((today.getDate() === reminderDate.getDate()) &&
      (today.getMonth() === reminderDate.getMonth())) {
    return true;
  } else {
    return false;
  }
}

// function that sends the email reminder
function emailReminder(eventName,reminderMessage) {
  var emailSubject = "Auto-Reminder: " + eventName;
  var emailRecipient = Session.getActiveUser().getEmail();
  var emailBody = reminderMessage;
  MailApp.sendEmail(emailRecipient, emailSubject, emailBody);
}