var schemes_arr = []
var schemes_num_arr = []

function explodeSchemes() {
    var schemes = $('#schemes').val()
    schemes_arr = schemes.split("\n")
    addSchemesToView()
    $('#step1').fadeOut()
    $('#step2').fadeIn()
}

function addSchemesToView() {
    var final_template = ''
    for(var i = 0; i < schemes_arr.length; i++) {
        var scheme_template = $('#scheme_template').html()
        scheme_template = scheme_template.replace('{{scheme}}', schemes_arr[i])
        scheme_template = scheme_template.replace('{{count}}', i)
        final_template += scheme_template
    }
    $('#per-scheme').html(final_template)
}

function saveNumbers() {
    for(var i = 0; i < schemes_arr.length; i++) {
        var temp_nums = $('#'+i).val()
        var all_nums = temp_nums.split("\n")
        var final_all_nums = []
        for(var j = 0; j < all_nums.length; j++) {
            final_all_nums.push(parseInt(all_nums[j]))
        }
        schemes_num_arr.push(final_all_nums)
    }
    finalSave()
}

function finalSave() {
    if(localStorage.schemes) {
        var schemes_temp_arr = JSON.parse(localStorage.schemes)
    } else {
        var schemes_temp_arr = []
    }
    var final_schemes_array = schemes_temp_arr.concat(schemes_arr)
    localStorage.setItem('schemes', JSON.stringify(final_schemes_array))

    if(localStorage.scheme_number) {
        var scheme_number_temp_arr = JSON.parse(localStorage.scheme_number)
    } else {
        var scheme_number_temp_arr = []
    }
    var final_scheme_number_array = scheme_number_temp_arr.concat(schemes_num_arr)
    localStorage.setItem('scheme_number', JSON.stringify(final_scheme_number_array))
    alert('Refresh to see changes')
    window.close()
}
