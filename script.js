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

  function spinWheel () {
    sendData()
  }

  
    $.ajax({
      url: "https://d1m54pdnjzjnhe.cloudfront.net/pngineer/f7e4d030-44eb-11e6-bc2a-bd6977d48a11.json",
      dataType: "text",
      success: function(data) {
          
          data = $.parseJSON(data);
          var numberOfResults = data.Properties.Property.length
          var random = Math.floor((Math.random() * 10) + 1);
          var item = data.Properties.Property[0]

          var result = [
            '<div class="hotel">',
             // '<a href="'+ + '">',
                '<img src="' + item.MainImageURL + '">', 
                '<div class="desc-container">',
                  '<h3>"' + item.Location + '"</span>',
                  '<h2 class="name">' + item.PropertyName + '</h3>',
                  '<div class="star-rating">',
                    '<div class="star"><img src="./public/images/star.png"></div>',
                    '<div class="star"><img src="./public/images/star.png"></div>',
                    '<div class="star"><img src="./public/images/star.png"></div>',
                    '<div class="star"><img src="./public/images/star.png"></div>',
                    '<div class="star"><img src="./public/images/star.png"></div>',
                  '</div>', 
                  '<div class="trip-advisor">',
                    '<span class="ratingEmpty"><span class="ratingFill star5"></span></span>',
                  '</div>',
                  '<p class="short-description">' + item.ShortDescription + '</p>',
                  '<div>',
                    '<span class="price">',
                      '<span class="from">from</span>',
                      '<span class="money">&pound;' + item.PricePPPN+ '</span>',
                    '</span>',
                  '</div>',
                  '<img class="arrow-hotel" src="./public/images/arrow.png"/>',
                '</div>',
             // '</a>',
            '</div>'
          ].join('')

          $('.search-result').append(result)
      }
    });
// ====================================================
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
    spinWheel()
    var $activeEl = $('.active')
    $('.roulette').addClass('fast-roulette')
    setTimeout(function () {
      $('.roulette').removeClass('fast-roulette')
      $('.roulette').addClass('slower-roulette')
      setTimeout(function () {
         $('.roulette').removeClass('slower-roulette')
         $('.hotel-question').hide()
         $('.hotel').fadeIn()
      },3000)
    },8000)
    $activeEl.hide().next().show()
    $activeEl.removeClass('active')
    $activeEl.next().addClass('active')
    $('.prev-button').hide()
    $('.next-button').hide()
    $('.play-button').hide()
  })

})
