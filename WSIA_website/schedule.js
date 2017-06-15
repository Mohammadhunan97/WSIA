$(document).ready(function() {
	function csvToHTML(csv) {
	    let lines = csv.split(/\r\n|\n/);
	    for (let i=1; i<lines.length; i++) {
	        let data = lines[i].split(',');   
	        document.getElementsByClassName('sun-'+data[0])[0].innerText = data[1];
	        document.getElementsByClassName('mon-'+data[0])[0].innerText = data[2];
	        document.getElementsByClassName('tues-'+data[0])[0].innerText = data[3];
	        document.getElementsByClassName('wed-'+data[0])[0].innerText = data[4];
	        document.getElementsByClassName('thu-'+data[0])[0].innerText = data[5];
	        document.getElementsByClassName('fri-'+data[0])[0].innerText = data[6];
	        document.getElementsByClassName('sat-'+data[0])[0].innerText = data[7];
	    }
	}
	$.ajax({
        type: "GET",
        url: "https://docs.google.com/spreadsheets/d/14KsUtMrzAlGEVRxUfy6FlmFvGGh2ACN2dzVpPs0DTWo/pub?output=csv",
        dataType: "text",
        success: function(data) {
        	csvToHTML(data);
        }
     });

}); //end of document.ready
	
