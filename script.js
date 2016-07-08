/* global $*/
$(document).ready(function () {
// init the slider for step 1 - budget
  $('.budget-slider-container').slider({
    range: true,
    max: 5000,
    min: 0,
    values: [500, 1000],
    slide: function (event, ui) {
      $('#budget-amount').val('$' + ui.values[ 0 ] + ' - $' + ui.values[1])
    }
  })
  $('#budget-amount').val('$' + $('.budget-slider-container').slider('values', 0) + ' - $' + $('.budget-slider-container').slider('values', 1))

  if ($('#step1-budget').hasClass('active')) {
    $('.prev-button').hide()
  }

  $('.prev-button').click(function () {
    var $activeEl = $('.active')
    $activeEl.hide().prev().show()
    $activeEl.removeClass('active')
    $activeEl.prev().addClass('active')
  })

  $('.next-button').click(function () {
    var $activeEl = $('.active')
    $activeEl.hide().next().show()
    $activeEl.removeClass('active')
    $activeEl.next().addClass('active')
    $('.prev-button').show()
  })

  $('#period-length').dateRangePicker({
    inline: true,
    container: '#period-container',
    alwaysOpen: true,
    minDays: 2,
    maxDays: 14
  })


})
