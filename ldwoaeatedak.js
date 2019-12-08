
var employeeData;
$(document).ready(function() {
  $.getJSON(
    "https://sheets.googleapis.com/v4/spreadsheets/1N2upLY61o3hxaW4rAgqBjx7U1LntsmLutXE9LTAwCy8/values/top20weekly!A1:L101?key=AIzaSyBn2U8krqzA8EZrKk2Ca6HXA3JHj0Y76F0",
    function(data) {
      employeeData = data;
      console.log(data);
      var table = $(
        '<table ID="WeeklyTable" class="table table-striped tablesorter top20"></table>'
      );
      table.append(
        $(
          '<thead><tr><th>本周排名</th><th>上週排名</th><th>中文片名</th><th>上映週數</th><th>觀影人次</th><th>跌幅</th><th class="sorter-namedNumbers">本周票房</th><th class="sorter-namedNumbers">累積人次</th><th class="sorter-namedNumbers">累積票房</th><th>國別地區</th></thead>'
        )
      );
      for (i = 1; i < 21; i++) {
        var employee = employeeData.values[i];
        table.append(
          $(
            "<tr><td>" +
              employee[1] +
              "</td><td>" +
              employee[2] +
              "</td><td>" +
              employee[3] +
              "</td><td>" +
              employee[4] +
              "</td><td>" +
              employee[5] +
              "</td><td>" +
              employee[6] +
              "</td><td>" +
              employee[7] +
              "</td><td>" +
              employee[8] +
              "</td><td>" +
              employee[9] +
              "</td><td>" +
              employee[10] +
              "</td>"
          )
        );
      }
      $("#weekly_table").html("");
      $("#weekly_table").append(table);
      $("#WeeklyTable").tablesorter({ widgets: ["zebra", "cssStickyHeaders"] });
      for (i = 1; i < data.values.length; i += 20) {
        var Startdate = data.values[i][11];
        var Enddate = data.values[i][0];
        
        $("#wboxSelect").append(
          $("<option>", {
            value: Enddate,
            text: Startdate + " - " + Enddate
          })
        );
      }
      $("#wboxList").show();
      $("#loading").hide();
    }
  );
});
//$('#employeeList').submit(function(e){
$("#wboxSelect").change(function() {
  //  e.preventDefault();
  displayWboxoffice($("#wboxSelect").val());
});
function displayWboxoffice(name) {
  var table = $(
    '<table ID="Querytable" class="table table-striped tablesorter top20"></table>'
  );
  table.append(
    $(
      '<thead><tr><th>本周排名</th><th>上週排名</th><th>中文片名</th><th>上映週數</th><th>觀影人次</th><th>跌幅</th><th class="sorter-namedNumbers">本周票房</th><th class="sorter-namedNumbers">累積人次</th><th class="sorter-namedNumbers">累積票房</th><th>國別地區</th></thead>'
    )
  );
  for (i = 1; i <= 100; i++) {
    console.log(i);
    var employee = employeeData.values[i];
    if (employee[0] == name) {
      table.append(
        $(
          "<tr><td>" +
            employee[1] +
            "</td><td>" +
            employee[2] +
            "</td><td>" +
            employee[3] +
            "</td><td>" +
            employee[4] +
            "</td><td>" +
            employee[5] +
            "</td><td>" +
            employee[6] +
            "</td><td>" +
            employee[7] +
            "</td><td>" +
            employee[8] +
            "</td><td>" +
            employee[9] +
            "</td><td>" +
            employee[10] +
            "</td>"
        )
      );
    }
  }
  $("#weekly_table").hide();
  $("#wboxDetails").html("");
  $("#wboxDetails").append(table);
  $("#Querytable").tablesorter({ widgets: ["zebra", "cssStickyHeaders"] });
}
