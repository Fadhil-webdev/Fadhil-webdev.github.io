window.addEventListener("load", function(){
    GetBookings();
});

function GetBookings(){
    let url = 'https://api.sheety.co/9d217e1c2860acd3796d913f7180bcac/booking/bookings';
    fetch(url)
    .then((response) => response.json())
    .then(json => {
      // Do something with the data
      //console.log(json.bookings);
      var bookings = document.getElementById("booking-list");
      var bookingIds = []
            
      for(var i = 0; i < json.bookings.length; i++){
        var gName = json.bookings[i].name;
        var gEmail = json.bookings[i].email;
        var gPax = json.bookings[i].pax;
        var gId = json.bookings[i].id;
        var buttonId = "delete" + gId; //<---

        let row = bookings.insertRow(bookings.rows.length);
        row.insertCell(0).innerHTML = gId;
        row.insertCell(1).innerHTML = gName;
        row.insertCell(2).innerHTML = gEmail;
        row.insertCell(3).innerHTML = gPax;
        row.insertCell(4).innerHTML = "";  //---Remarks>
        row.insertCell(5).innerHTML = "<button id='" + buttonId + "'class='btn btn-danger'>Delete</button><br/>";
      
       bookingIds.push(buttonId);
        
        //console.log(buttonId);//
        bookingIds.push(buttonId);
        
      }
      
      for (let j = 0; j < bookingIds.length; j++){
          let el = document.getElementById(bookingIds[j]);
          el.addEventListener("click", function(){
          let theId = bookingIds[j].replace("delete", "");
          DeleteBooking(theId);
        
          
        });
      }

  });
}



function DeleteBooking(id){

  if (confirm("Are you sure you want to delete?")) {
    let url = 'https://api.sheety.co/9d217e1c2860acd3796d913f7180bcac/booking/bookings' + id;
    fetch(url, {
      method: 'DELETE',
      })
          .then((response) => {
              location.reload();
          });        
      
  } else {
    alert("Delete cancelled");
  }
  
}

