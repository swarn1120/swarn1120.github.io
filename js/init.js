(function($) {
  $(function() {
    $('select').material_select();
    var elem = document.querySelector('.fixed-action-btn');
    var instance = M.FloatingActionButton.init(elem, {
      direction: 'left',
      hoverEnabled: false
    });
          
    $('.slider').slider();
    $(".button-collapse").sideNav();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    $('input#input_text, textarea#textarea1').characterCounter();
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: true, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function() {} //Function for after opening timepicker
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
