function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  sheet.appendRow([
    new Date(),
    e.parameter.name,
    e.parameter.email,
    e.parameter.property,
    e.parameter.location,
    e.parameter.services
  ]);
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
}
