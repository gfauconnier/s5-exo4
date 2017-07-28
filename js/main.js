displayClients("");


$("select").change(function() {
  if ($("select option:selected").val() != "sort") {
    displayClients($("select option:selected").val());
  }
});

function displayClients(param) {
  var tabContent = "";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      clientFile = JSON.parse(this.responseText);

      if (param != "") {
        clientFile.clients.sort(function(a, b) {
          if (a[param] < b[param]) {
            return -1;
          } else if (a[param] > b[param]) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      for (x in clientFile.clients) {
        tabContent += "<tr><td>" + clientFile.clients[x].fname + "</td><td>" + clientFile.clients[x].lname +
          "</td><td>" + clientFile.clients[x].age + "</td><td>" + clientFile.clients[x].city + "</td></tr>"
      }
      $("#clienttable tbody").html(tabContent);
      tabContent = "";
    }
  };
  xmlhttp.open("GET", "js/clients.json", true);
  xmlhttp.send();
}
