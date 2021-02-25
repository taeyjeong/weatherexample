$(document).ready(function() {
  var x = localStorage.getItem('city') // GRABBING THE HISTORY
  var arr = []
  arr.push(x)
  arr.map(function() {
    for (let i = 0; i < arr.length; i++) {
    var getList = document.createElement('li')
    $(getList).html(arr[i])
    $(getList).addClass('list-group-item')
    $(getList).appendTo('#history')
    }
  })
  console.log(arr.length)
  $('#submit').on('click', function() {
    fetch( // FETCHING THE DATA FOR TODAY
      'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=4f4fc4b2d81e48700fb99a35e316ea42'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var iconcode = data['weather']['0']['icon'] // OBTAINING THE ICON FILE NAME
      var iconurl = "http://openweathermap.org/img/w/"+iconcode+".png"; // OBTAINING THE SOURCE FOR ICON IMAGE
      $('#wicon').attr('src', iconurl) // INSERTING THE ICON IMAGE
      $('#city').html(data['name']) // INSERTING THE FETCHED CITY DATA
      $('#temp').html((((data['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F") // INSERTING THE FETCHED TEMP DATA
      $('#humid').html(data['main']['humidity'] + "%") // INSERTING THE FETCHED HUMIDITY DATA
      $('#wind').html((data['wind']['speed']) + "mph") // INSERTING THE FETCHED WIND SPEED DATA
      // CREATE LATITUDE & LONGITUDE VARIABLES TO INSERT INTO THE NEXT FETCH
      var lat = data['coord']['lat']
      var lon = data['coord']['lon']
      // SETTING LOCAL STORAGE VALUES OF FETCHED CITY
      arr.push(data['name'])
      localStorage.setItem('city', arr)
      var setList = document.createElement('li')
      $(setList).html(data['name'])
      $(setList).addClass('list-group-item')
      $(setList).appendTo('#history')
      fetch( // CREATING A NEW FETCH FOR UV INDEX B/C NEED TO USE LATITUDE/LONGITUDE DATA FROM PREVIOUS FETCH
        'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely&appid=4f4fc4b2d81e48700fb99a35e316ea42'
      )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var uvDanger = data['current']['uvi']
        $('#uv').html(uvDanger)
        // UV index changes background color based on rating
        if (uvDanger < 3) {
          $('#uv').css('background-color', 'green')
        } else if (uvDanger > 3 && uvDanger < 6) {
          $('#uv').css('background-color', 'yellow')
        } else if (uvDanger > 6 && uvDanger < 8) {
          $('#uv').css('background-color', 'orange')
        } else if (uvDanger > 8 && uvDanger < 10) {
          $('#uv').css('background-color', 'red')
        } else {
          $('#uv').css('background-color', 'black')
          $('#uv').text('DANGER')
        }
      })
    })
    // FETCHING THE DATA FOR 5 DAY FORECASTS
    fetch(
      'https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=4f4fc4b2d81e48700fb99a35e316ea42'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // OBTAINING THE ICON FILE NAME
      var iconcode1 = data['list']['7']['weather']['0']['icon']
      var iconcode2 = data['list']['15']['weather']['0']['icon']
      var iconcode3 = data['list']['23']['weather']['0']['icon']
      var iconcode4 = data['list']['31']['weather']['0']['icon']
      var iconcode5 = data['list']['39']['weather']['0']['icon']
      // OBTAINING THE SOURCE FOR THE ICON IMAGE
      var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png"
      var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png"
      var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png"
      var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png"
      var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png"
      // INSERTING THE ICON IMAGE 
      $('#icon1').attr('src', iconurl1)
      $('#icon2').attr('src', iconurl2)
      $('#icon3').attr('src', iconurl3)
      $('#icon4').attr('src', iconurl4)
      $('#icon5').attr('src', iconurl5)
      // INSERTING 5 DATES AFTER TODAY
      $('#date0').html(data['list']['0']['dt_txt'].slice(5, 7) + "/" + data['list']['0']['dt_txt'].slice(8, 10) + "/2021")
      $('#date1').html(data['list']['7']['dt_txt'].slice(5, 7) + "/" + data['list']['7']['dt_txt'].slice(8, 10) + "/2021")
      $('#date2').html(data['list']['15']['dt_txt'].slice(5, 7) + "/" + data['list']['15']['dt_txt'].slice(8, 10) + "/2021")
      $('#date3').html(data['list']['23']['dt_txt'].slice(5, 7) + "/" + data['list']['23']['dt_txt'].slice(8, 10) + "/2021")
      $('#date4').html(data['list']['31']['dt_txt'].slice(5, 7) + "/" + data['list']['31']['dt_txt'].slice(8, 10) + "/2021")
      $('#date5').html(data['list']['39']['dt_txt'].slice(5, 7) + "/" + data['list']['39']['dt_txt'].slice(8, 10) + "/2021")
      // INSERTING THE FETCHED TEMPERATURE DATA FOR 5 DATES AFTER TODAY
      $('#day1temp').html((((data['list']['7']['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F")
      $('#day2temp').html((((data['list']['15']['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F")
      $('#day3temp').html((((data['list']['23']['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F")
      $('#day4temp').html((((data['list']['31']['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F")
      $('#day5temp').html((((data['list']['39']['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F")
      // INSERTING THE FETCHED HUMIDITY DATA FOR 5 DATES AFTER TODAY
      $('#day1humid').html(data['list']['7']['main']['humidity'] + "%")
      $('#day2humid').html(data['list']['15']['main']['humidity'] + "%")
      $('#day3humid').html(data['list']['23']['main']['humidity'] + "%")
      $('#day4humid').html(data['list']['31']['main']['humidity'] + "%")
      $('#day5humid').html(data['list']['39']['main']['humidity'] + "%")
    })
  })
})