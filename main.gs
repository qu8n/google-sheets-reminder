// For more information on using this script, see:
// https://github.com/qu8n/google-sheets-reminder/blob/main/README.md

const SHEET_NAME = "Events";
const EVENT_NAME_COL = 1;  // Column B
const REMINDER_DATE_COL = 6;  // Column G
const REMINDER_MSG_COL = 7;  // Column H

/**
 * Processes events from spreadsheet and sends email reminders.
 */
function main() {
  try {
    const activeSpreadsheet = SpreadsheetApp.getActive();
    const eventSheet = activeSpreadsheet.getSheetByName(SHEET_NAME);

    if (!eventSheet) {
      Logger.log("Events sheet not found");
      return;
    }

    const lastRowWithData = eventSheet.getLastRow();
    if (lastRowWithData <= 1) {
      Logger.log("No data found in the sheet");
      return;
    }

    const activeRows = eventSheet.getRange(2, 1, lastRowWithData - 1, 8).getValues();
    activeRows.forEach(row => {
      const reminderDate = row[REMINDER_DATE_COL];
      if (reminderDateIsToday(reminderDate)) {
        const eventName = row[EVENT_NAME_COL];
        const spreadsheetUrl = activeSpreadsheet.getUrl();
        const reminderMessage = row[REMINDER_MSG_COL] + "\n\nEdit or create reminder events at: " + spreadsheetUrl;
        emailReminder(eventName, reminderMessage);
      }
    });
  } catch (error) {
    Logger.log("Error in main(): " + error.toString());
  }
}

/**
 * Checks if the specified reminder date is today.
 *
 * @param {Date|string} reminderDate - The date to check
 * @return {boolean} True if the date is today, false otherwise
 */
function reminderDateIsToday(reminderDate) {
  try {
    const reminderDateObj = (reminderDate instanceof Date) ? reminderDate : new Date(reminderDate);
    if (isNaN(reminderDateObj.getTime())) {
      Logger.log("Invalid date format: " + reminderDate);
      return false;
    }

    const today = new Date();
    return today.getDate() === reminderDateObj.getDate() &&
           today.getMonth() === reminderDateObj.getMonth() &&
           today.getFullYear() === reminderDateObj.getFullYear();
  } catch (error) {
    Logger.log("Error in reminderDateIsToday(): " + error.toString());
    return false;
  }
}

/**
 * Sends an email reminder for the specified event.
 *
 * @param {string} eventName - The name of the event
 * @param {string} reminderMessage - The message to send in the reminder email
 */
function emailReminder(eventName, reminderMessage) {
  try {
    const emailSubject = "Auto-Reminder: " + eventName;
    const emailRecipient = Session.getActiveUser().getEmail();

    MailApp.sendEmail(emailRecipient, emailSubject, reminderMessage);
    Logger.log("Reminder sent for: " + eventName);
  } catch (error) {
    Logger.log("Error sending email reminder: " + error.toString());
  }
}
