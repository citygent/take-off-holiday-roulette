/* global $*/
$(document).ready(function () {
// init the slider for step 1 - budget
  $('.slider-container').slider({
    range: true,
    max: 5000,
    min: 0,
    values: [500, 100],
    slide: function (event, ui) {
      $('#budget-amount').val('$' + ui.values[ 0 ] + ' - $' + ui.values[1])
    }
  })
  $('#budget-amount').val('$' + $('.slider-container').slider('values', 0) + ' - $' + $('.slider-container').slider('values', 1))

<<<<<<< HEAD
	//init the slider for step 1 - budget
	$('.slider-container').slider();
});
=======
})
>>>>>>> 220bde6d3e26b74b3f36d211d958a3fa3e51c3bd
