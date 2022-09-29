document.addEventListener("DOMContentLoaded", function() {
  // List Countries
  fetch("data/countries.json")
    .then(response => {
      return response.json();
    })
    .then(countries => {
      var listBuilder = "";

      countries.forEach(country => {
        listBuilder += "<li>";
        listBuilder += country.emoji + " " + country.name;
        listBuilder += "<ul id=\"" + country.code + "\"></ul>"
        listBuilder += "</li>\n";
      });

      var parkData = document.getElementById("park-data");
      parkData.innerHTML = listBuilder;
    })
    .then(() => {
      // List Parks
      fetch("data/parks.json")
        .then(response => {
          return response.json();
        })
        .then(parks => {
          parks.forEach(park => {
            var linkedPark = document.createElement("a");
            linkedPark.textContent = park.name;
            linkedPark.setAttribute("href", 'parks/' + park.country.toLowerCase() + '/' + park.name.toLowerCase().replaceAll(' ', '-'));

            var listItem = document.createElement("li");
            listItem.appendChild(linkedPark);

            var country = document.getElementById(park.country);
            country.appendChild(listItem);
          });
        });
    });
});
