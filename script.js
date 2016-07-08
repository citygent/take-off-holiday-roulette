/* global $*/
$(document).ready(function () {
// init the slider for step 1 - budget
  $('.budget-slider-container').slider({
    range: true,
    max: 5000,
    min: 0,
    values: [500, 1000],
    slide: function (event, ui) {
      $('#budget-amount').val('£' + ui.values[ 0 ] + ' - £' + ui.values[1])
    }
  })
// init the datePicker for step2 - period
  $('#period-length').dateRangePicker({
    inline: true,
    container: '#period-container',
    alwaysOpen: true,
    minDays: 2,
    maxDays: 14
  })
// get the values for step4 - passengers
  var cohort = {
    adults: 1,
    children: 0,
    infants: 0
  }
  $('input[name=who]').change(function () {
    switch ($('input[name=who]').filter(':checked').val()) {
      case 'single':
        cohort.adults = 1
        $('.who-fam').hide()
        break
      case 'couple':
        cohort.adults = 2
        $('.who-fam').hide()
        break
      case 'fam':
        $('.who-fam').show()
        $('#who-adults').change(updateCohort)
        $('#who-children').change(updateCohort)
        $('#who-infants').change(updateCohort)
        break
      default:
        cohort.adults = 1
    }
  })
  function updateCohort () {
// well this is horrible! :)
    cohort.adults = $('#who-adults').val()
    cohort.children = $('#who-children').val()
    cohort.infants = $('#who-infants').val()
  }
// SEND ZE DATA.
  function sendData () {
    var periodLength = $('#period-length').val().split(' to ')
    var dateFrom = periodLength[0]
    var dateTo = periodLength[1]
    var type = $('input[name=type]').filter(':checked').val() || ''
    var budgetFrom = window.budgetFrom = $('.budget-slider-container').slider('values', 0)
    var budgetTo = window.budgetTo = $('.budget-slider-container').slider('values', 1)
    var search = {
      budgetFrom: budgetFrom,
      budgetTo: budgetTo,
      dateFrom: dateFrom,
      dateTo: dateTo,
      type: type,
      cohort: cohort
    }
    console.log(search)
  }
  function spinWheelofDeath () {
    sendData()
  }
  function checkRespectiveBox (e) {
    var uncheckFamily = $(e.target).prev('input').attr('class').split(' ') && $(e.target).prev('input').attr('class').split(' ')[0]
    $('.' + uncheckFamily).prop('checked', false)
    $(e.target).prev('input.' + uncheckFamily).prop('checked', true)
  }
// ====================================================
// click on image checks the box.
  $('img.radio-img').click(checkRespectiveBox)

// 'Dirty SPA nonsense'
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
    if (!$('.active').is('#step3-holiday-type')) {
      $activeEl.hide().next().show()
      $activeEl.removeClass('active')
      $activeEl.next().addClass('active')
      $('.prev-button').show()
      $('.play-button').hide()
    } else if ($('.active').is('#step3-holiday-type')) {
      $activeEl.hide().next().show()
      $activeEl.removeClass('active')
      $activeEl.next().addClass('active')
      $('.next-button').hide()
      $('.play-button').show()
    }
  })

  $('.play-button').click(function () {
    spinWheelofDeath()
    var $activeEl = $('.active')
    $activeEl.hide().next().show()
    $activeEl.removeClass('active')
    $activeEl.next().addClass('active')
    $('.prev-button').hide()
    $('.next-button').hide()
    $('.play-button').hide()
  })

})
