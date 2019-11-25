$(document).on("click", "p", function () {

  $("#notes").empty();

  var thisId = $(this).attr("data-id");

  

  $.ajax({
    method: "GET",
    url: "/redditarticle/"  + thisId, 

  
  })
  

    .then(function (data) {
      console.log(data);

      $("#notes").append("<h2>" + data.title + "</h2>");

      $("#notes").append("<input id='titleinput' name='title'>");

      $("#notes").append("<textarea id='bobyinput' name='body'></textarea>");

      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Notes</button>");

      if (data.edhnote) {

        $("#titleiniput").val(data.edhnote.title);

        $("#bodyinput").val(data.edhnote.body);
      }
    });
});



$(document).on("click", "#savenote", function () {

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/redditarticle/" + thisId, 
    data: {
      title: $("#titleinput").val(),

      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {

      console.log(data);

      $("#notes").emtpy();
      
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});