/*displayClients("");

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
     }
   };
   xmlhttp.open("GET", "js/clients.json", true);
   xmlhttp.send();
 }
*/

// ########################################################################################
// ########################################################################################
// ########################################################################################

function clientsManager(){
  this.displayClients = function(){
    var tabContent = "";
    for (x in clientsFile.clients) {
      tabContent += "<tr><td>" + clientsFile.clients[x].fname + "</td><td>" + clientsFile.clients[x].lname +
        "</td><td>" + clientsFile.clients[x].age + "</td><td>" + clientsFile.clients[x].city + "</td></tr>"
    }
    document.getElementById("tabBody").innerHTML = tabContent;
  }
  this.sortClients = function() {
    var selectElem = document.getElementById("selectVal");
    var sortOrder = selectElem.options[selectElem.selectedIndex].value;
    if (sortOrder != "sort") {
      clientsFile.clients.sort(function(a, b) {
        if (a[sortOrder] < b[sortOrder]) {
          return -1;
        } else if (a[sortOrder] > b[sortOrder]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    this.displayClients();
  }
}

var clientManager = new clientsManager();
document.getElementById("selectVal").addEventListener("change", function(){clientManager.sortClients();});

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    clientsFile = JSON.parse(this.responseText);

    clientManager.sortClients();
  }
};
xmlhttp.open("GET", "js/clients.json", true);
xmlhttp.send();
