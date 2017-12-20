document.addEventListener('DOMContentLoaded', function(){
    var button = document.getElementById('generateToken');
    button.addEventListener('click', function(e){
        e.preventDefault(e);
        var customerID = document.getElementById('customerID').value;
        var redirectURL = document.getElementById('redirectURL').value;
        var data = {
            customerID: customerID,
            redirectURL: redirectURL
        }
        data = JSON.stringify(data)
        console.log(data);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('tokenArea').textContent = this.responseText;
            }
        };
        xhttp.open('POST', '/generate', true)
        xhttp.setRequestHeader("Content-type", "application/json"); 
        xhttp.send(data);
    })
})