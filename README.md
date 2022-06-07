# Annual Event Email Reminder
## What it does
- Track important annual events like birthdays, anniversaries, and more in a simple Google Sheets table
- Automatically receive email reminders of these events on the day of or a specific number of days in advance

## How it works
This app uses [Google Apps Script](https://developers.google.com/apps-script), a JavaScript-based scripting language that lets you automate tasks across Google products. Via a [trigger](https://developers.google.com/apps-script/guides/triggers) that automatically runs each day, the script reviews each event in the Google Sheets table (template provided below) and sends out email reminders accordingly.

## How to set it up
Create your own Google Sheets event tracker with [this template](https://docs.google.com/spreadsheets/d/1gI6FTBnFJY-zWDmW_PmA8pUEZJagkbV-0GhxQB0TtxA/edit#gid=0). 

Click on `File` > `Make a copy` in the navigation bar:
![copy_template](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/copy_template.png)

Rename the file and select its location, but leave attached script as-is:
![copy_template_2](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/copy_template_2.png)

In the newly copied Google Sheets file, fill out a pseudo event that takes place today so we can test the template.

Click on `Extensions` > `Apps Script` in the navigation bar to open up the Google Apps Script window. Click the Run icon to test the script. Follow the exact steps in the GIF below to properly grant the script permissions:
![test_run](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/test_run.gif)

Voila! You should see the event reminder email appearing in your inbox:
![test_email](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/test_email.png)

Now that we know the script works, return to the Google Apps Script window and click on `Triggers` on the side navigation bar.
![triggers](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/triggers.png)

These settings dictate when the script will automatically run. Below is my recommendation.
![triggers_settings](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/triggers_settings.png)

That's it! The last step is filling out the Google Sheets file with your personal events. Note that each row represents a single email reminder, so you might have multiple rows for a single event (e.g. a reminder for mom's birthday on the day of and another reminder 7 days prior).
![example](https://github.com/quandollar/event-email-reminder/blob/main/demo_assets/example.png)