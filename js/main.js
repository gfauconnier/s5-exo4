var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        clientFile = JSON.parse(this.responseText);
        for (x in clientFile.clients) {
          $("#clienttable thead").append("<tr><td>" + clientFile.clients[x].fname + "</td><td>" +
            clientFile.clients[x].lname + "</td><td>" + clientFile.clients[x].age + "</td><td>" +
            clientFile.clients[x].city + "</td></tr>");
      }
    }
};
xmlhttp.open("GET", "js/clients.json", true);
xmlhttp.send();
