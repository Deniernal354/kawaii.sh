// Checking if the token is valid
if (localStorage.getItem('admin_token') !== null) {
  axios({
    method: 'post',
    url: '/api/admin/token/valid',
    data: {
      token: localStorage.getItem('admin_token')
    }

  }).then(function () {
    window.location.replace('/admin/dash')
  }).catch(function () {
    localStorage.removeItem('admin_token')
  })
}

function login () {
  username = document.getElementById('userfield').value
  password = document.getElementById('passfield').value
  axios({
    method: 'post',
    url: '/api/admin/token/get',
    data: {
      username: username,
      password: password
    }
  }).then(function (response) {
    const token = response.data // Get user token
    localStorage.setItem('admin_token', token) // Set user token in localstorage
    window.location.replace('/admin/dash')
  }).catch(function (error) {
    if ($('#errortext').length > 0) {
      $('#errortext').remove()
    }
    // Sending error text
    $('#errormessage').append(`<div id="errortext" style="margin-top: 5px;"><p class="tag is-danger">${error.response.data}</p></div>`)
  })
}
