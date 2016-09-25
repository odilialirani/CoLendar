// Colendar WebApp
// Created by Odilia Lirani
// oclirani@gmail.com


var db_key = '1XAViArsBNVMooUlVsUX00qGGr2oTSgPiTuIxqGqIu7A';
var RECEIVE_URL = 'https://spreadsheets.google.com/feeds/list/1XAViArsBNVMooUlVsUX00qGGr2oTSgPiTuIxqGqIu7A/1/public/basic?alt=json';
var SUBMIT_URL = "https://script.google.com/macros/s/AKfycbydQlVzcoNcRZjV-sdeL91uf2zXCQIQBHNz-yBmb6CvpckmhK0/exec";
var JSONURL = "https://spreadsheets.google.com/feeds/list/1XAViArsBNVMooUlVsUX00qGGr2oTSgPiTuIxqGqIu7A/1/public/basic?alt=json";

$(document).ready(function() {
	$.ajax({
		url: RECEIVE_URL,
		success: function(data) {
			console.log(data)
			readDataAndAppend(data);
		}
	})

	// Submitting data
	$("#sign_form").submit(function (event) {
		event.preventDefault();
		var data = $(this).serialize();
		console.log(data)
		$.ajax({
			url: SUBMIT_URL,
			type: "POST",
			data: data
		});
	})
})

function readDataAndAppend(data) {
	var allData = [];
	var cells = data.feed.entry;

	for (var i = 0; i < cells.length; i++) {
		var rowObj = {};
		rowObj.timestamp = cells[i].title.$t;
		var rowCols = cells[i].content.$t.split(',');
		for (var j = 0; j < rowCols.length; j++) {
			var keyval = rowCols[j].split(':');
			rowObj[keyval[0].trim()] = keyval[1].trim();
		}
		allData.push(rowObj);
	}
	console.log(allData)

	for (var i = 0; i < rowObj.length; i++) {
		var obj = allData[i];
		var firstName = "<h3>" + obj.first_name + "</h3>"
		var lastName = "<h3>" + obj.last_name + "</h3>"
		var email = "<h3>" + obj.email + "</h3>"
		var pass = "<h3>" + obj.password + "</h3>"

		$("#display_post").append(firstName + lastName + email + pass)
	}
}