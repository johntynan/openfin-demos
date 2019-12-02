<DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta name="WebPartPageExpansion" content="full" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Population</title>
<meta http-equiv="X-UA-Compatible" content="IE=10" />
<SharePoint:CssRegistration Name="default" runat="server"/>
</head>

<body>
<script src="/yoursite/SiteAssets/js/jQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
<script src="/yoursite/SiteAssets/js/pnp/pnp.js" type="text/javascript"></script>
<script src="/yoursite/SiteAssets/js/json2html/json2html.js" type="text/javascript"></script>
<script src="js/urlparameters.js" type="text/javascript"></script>
<script>

var populationtId = getUrlParam('PopulationId','Please Select an population id');

console.log(populationtId);

	listURL = "https://yoursubdomain.sharepoint.com/yoursite/_api/web/lists/GetByTitle('population')/items(" + populationtId +")";
	console.log(listURL);

    $.ajax({
    
		url: listURL,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function(data){
        	console.log(data);
        	$('#DataList').append("<tr>" + "<td>" + data.d.Title + "</td>" + "<td>" + data.d.GroupA + "</td>" + "<td>" + data.d.GroupB + "</td>" + "<td>" + data.d.GroupC + "</td>" + "</tr>");
            // $.each(data.d.results, function(index, item){
            /* $.each(data.d, function(index, item){
                $('#postsList').append("<tr>" + "<td>" + data.d.City + "</td>" + "<td>" + data.d.Country + "</td>" + "</tr>");
                document.write("<table><tr>" + "<td>" + data.d.City + "</td>" + "<td>" + data.d.Country + "</td>" + "</tr></table>");
            }); */
        },
        error: function(error){
            alert(JSON.stringify(error));
        }

});

/*
// https://json2html.com/examples/
let transform = {"<>":"table","id":"postsTable","html":[
    {"<>":"tbody","html":[
        {"<>":"tr","html":[
            {"<>":"td","html":"${id}"}
          ]},
        {"<>":"tr","html":[
            {"<>":"td","html":"${title}"}
          ]}
      ]}
  ]};

document.write( json2html.transform(data,transform) );

*/  

  
</script>
<style>
table {
  border-collapse: collapse;
}

table, td, th {
	border: 1px solid black;
    padding: 2px;
}
</style>

<table id="DataList">
<tr>
	<th>Title</th>
	<th>Group A</th>
	<th>Group B</th>
	<th>Group C</th>
</tr>
</table>

</body>
</html>