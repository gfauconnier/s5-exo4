function clientsManager() {
  this.displayClients = function() {
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
    // sorts the elements of the json file
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
  this.addClient = function() {
    // adds lines temporary to the parsed .json content
    clientsFile.clients.push({
      fname: document.getElementsByClassName("inputAdd")[0].value,
      lname: document.getElementsByClassName("inputAdd")[1].value,
      age: document.getElementsByClassName("inputAdd")[2].value,
      city: document.getElementsByClassName("inputAdd")[3].value
    });
    this.displayClients();
  }
}

var clientManager = new clientsManager();
document.getElementById("selectVal").addEventListener("change", function() {
  clientManager.sortClients();
});
document.getElementById("buttonAdd").addEventListener("click", function() {
  clientManager.addClient();
})

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    clientsFile = JSON.parse(this.responseText);
    clientManager.sortClients();
  }
};
xmlhttp.open("GET", "js/clients.json", true);
xmlhttp.send();
