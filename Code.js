/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Update Queue', functionName: 'updateQueue_'}
  ];
  spreadsheet.addMenu('Carpool Time!', menuItems);
}

/**
 * Updates the queue by moving the cars in "Next Up"
 * into the queue and clearing the "Next Up" column.
 */
function updateQueue_() {
  // Get current sheet 
  var spreadsheet = SpreadsheetApp.getActive();
  
  // Get the values from the queue and the next up lines 
  var Bvalues = spreadsheet.getRange('B3:B12').getValues();
  var Dvalues = spreadsheet.getRange('D3:D12').getValues();
  var Evalues = spreadsheet.getRange('E3:E12').getValues();
  var Fvalues = spreadsheet.getRange('F3:F12').getValues();
  
  // Shift the values over and clear the last next up 
  spreadsheet.getRange('B3:B12').setValues(Dvalues);
  spreadsheet.getRange('D3:D12').setValues(Evalues);
  //spreadsheet.getRange('D3:D12').clearContent();
  spreadsheet.getRange('E3:E12').setValues(Fvalues);
  spreadsheet.getRange('F3:F12').clearContent();
  
  // Optional tracker for most recent old queue
  spreadsheet.getRange('N3:N12').setValues(Bvalues);
}

/**   BROKEN - DO NOT USE 
 * Updates the queue by moving the cars in "Next Up"
 * into the queue and clearing the "Next Up" column.
 */
/*function updateQueue1_() {
  // Get current sheet 
  var spreadsheet = SpreadsheetApp.getActive();
  
  // Get the values from the queue and the next up lines 
  var Bvalues1 = spreadsheet.getRange('B3:B3').getValues();
  var Bvalues9 = spreadsheet.getRange('B4:B12').getValues();
  var Cvalues1 = spreadsheet.getRange('C3:C3').getValues();
  var Cvalues9 = spreadsheet.getRange('C4:C12').getValues();
  var Dvalues1 = spreadsheet.getRange('D3:D3').getValues();
  var Dvalues9 = spreadsheet.getRange('D4:D12').getValues();
  var Evalues1 = spreadsheet.getRange('E3:E3').getValues();
  var Evalues9 = spreadsheet.getRange('E4:E12').getValues();
  
  var Jvalues9 = spreadsheet.getRange('J4:J12').getValues();
  
  // Shift the values over and clear the last next up 
  spreadsheet.getRange('B3:B11').setValues(Bvalues9);
  spreadsheet.getRange('B12:B12').setValues(Cvalues1);
  spreadsheet.getRange('C3:C11').setValues(Cvalues9);
  spreadsheet.getRange('C12:C12').setValues(Dvalues1);
  //spreadsheet.getRange('D3:D12').clearContent();
  spreadsheet.getRange('D3:D11').setValues(Dvalues9);
  spreadsheet.getRange('D12:D12').setValues(Evalues1);
  spreadsheet.getRange('E3:E11').setValues(Evalues9);
  spreadsheet.getRange('E12:E12').clearContent();
  
  // Optional tracker for most recent old queue
  spreadsheet.getRange('J3:J11').setValues(Jvalues9);
  spreadsheet.getRange('J12:J12').setValues(Bvalues1);
}*/

/**
 * On edit function that allows the checkbox in cell E1 
 * to trigger the function same as 'Update Queue'. 
 * Enables effective use of this on mobile. 
 */
function onEdit(e) {
  const rg = e.range;
  if (rg.getA1Notation() === 'L2' && rg.isChecked()) {
    updateQueue_();
    rg.uncheck();
  }
  /*else if (rg.getA1Notation() === 'H5' && rg.isChecked()) {
    updateQueue1_();
    rg.uncheck();
  }*/
}


