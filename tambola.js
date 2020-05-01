// Edit your schemes and respective numbers here

var schemes = [
	"Scheme 1",
	"First Line",
	"Second Line",
	"King"
]

var scheme_numbers = [
	[2,24,41,52,82],
	[10,29,56,64,89],
	[17,31,44,75,90],
	[2, 8, 17]
]

var sagiri_arr = []
var scheme_html = ''
var removed_schemes = []

function makeLocalstorage() {
	localStorage.setItem('sagiri', '[]')
}

function updateArr(new_num) {
	sagiri_arr.push(parseInt(new_num))
	localStorage.setItem('sagiri', JSON.stringify(sagiri_arr))
}

function addNewNum(ele) {
	if(!localStorage.sagiri) {
		makeLocalstorage()
	}
	if(!$('#input-ticket .col-md-1 input').prop('readonly')) {
		return
	}
	if(ele.value == '') {
		return
	}
	ele.setAttribute('style', 'color: rgba(255, 0, 0, 0.6)')
	if($.inArray(parseInt(ele.value), sagiri_arr) > -1) {
		return
	}
	updateArr(ele.value)
	updateScheme()
	updateHistory()
	saveTicket()
}

function resetNumbers() {
	$('#ticket_num').val('')
	localStorage.setItem('sagiri', '[]')
	sagiri_arr = []
	$('#input-tickets').html('')
	$('#add_btn').prop('disabled', false)
	$('#lock_btn').prop('disabled', false)
	localStorage.setItem('ticket_html', '')
	localStorage.setItem('removedScheme', '')
	removed_schemes = []
	updateScheme()
	updateHistory()
}

function updateScheme() {
	var schemes_final = ''
	for(var i = 0; i < schemes.length; i++) {
		if($.inArray(i, removed_schemes) > -1) {
			continue
		}
		var current_scheme_num_arr = scheme_numbers[i]
		var temp_scheme_arr = []
		for(var j = 0; j < current_scheme_num_arr.length; j++) {
			if($.inArray(current_scheme_num_arr[j], sagiri_arr) > -1) {
				continue
			} else {
				temp_scheme_arr.push(current_scheme_num_arr[j])
			}
		}
		if(temp_scheme_arr.length == 0) {
			alert('Scheme '+schemes[i]+' done!')
		}
		var temp_html = scheme_html
		temp_html = temp_html.replace("{{scheme}}", schemes[i])
		temp_html = temp_html.replace("{{scheme_id}}", i)
		temp_html = temp_html.replace("{{scheme_id}}", i)
		temp_html = temp_html.replace("{{scheme_num}}", JSON.stringify(temp_scheme_arr))
		schemes_final += temp_html
	}
	$('#current_schemes').html(schemes_final)
}

function addNewTicket() {
	var ticket_row = $('#ticket_template').html()
	var single_ticket = ticket_row + ticket_row + ticket_row +"<br>"
	$('#input-tickets').html($('#input-tickets').html() + single_ticket)
}

function saveTicket() {
	if(!localStorage.ticket_html) {
		localStorage.setItem('ticket_html', '')
	}
	for(var i = 0; i < $('#input-ticket .col-md-1 input').length; i++) {
	    $('#input-ticket .col-md-1 input')[i].setAttribute('value', $('#input-ticket .col-md-1 input')[i].value)
	}
	localStorage.ticket_html = $('#input-tickets').html()
}

function lockTicket() {
	$('#add_btn').prop('disabled', true)
	$('#input-ticket .col-md-1 input').prop('readonly', true)
	$('#lock_btn').prop('disabled', true)
	saveTicket()
}

function updateHistory() {
	$('#number_history').html(JSON.stringify(sagiri_arr))
}

function removeScheme(scheme_id) {
	if(!localStorage.removedScheme) {
		localStorage.setItem('removedScheme', '')
	}
	removed_schemes.push(scheme_id)
	localStorage.setItem('removedScheme', JSON.stringify(removed_schemes))
	$('#scheme_'+scheme_id).fadeOut()
	updateScheme()
}


$(document).ready(function() {
	if(localStorage.sagiri) {
		sagiri_arr = JSON.parse(localStorage.sagiri)
	}

	if(schemes.length !== scheme_numbers.length) {
		alert("Schemes and numbers length doesn't match!")
	}

	scheme_html = $('#scheme_template').html()

	var schemes_final = ''
	for(var i = 0; i < schemes.length; i++) {
		var temp_html = scheme_html
		temp_html = temp_html.replace("{{scheme}}", schemes[i])
		temp_html = temp_html.replace("{{scheme_num}}", JSON.stringify(scheme_numbers[i]))
		schemes_final += temp_html
	}
	$('#schemes').html(schemes_final)

	updateScheme()
	
	if(localStorage.ticket_html) {
		$('#input-tickets').html(localStorage.ticket_html)
	}

	if(localStorage.removedScheme) {
		removed_schemes = JSON.parse(localStorage.removedScheme)
		updateScheme()
	}

	$('#number_history').html(JSON.stringify(sagiri_arr))
})