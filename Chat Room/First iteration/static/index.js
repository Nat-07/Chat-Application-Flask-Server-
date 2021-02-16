document.addEventListener('DOMContentLoaded', () => {

    //connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    
    // out going
    socket.on('connect', () => {

        //run function if button is pressed
        document.getElementById("send-button").onclick = () =>{
           
            const selection = document.getElementById('input-field').value

            if (document.getElementById("input-field").value != "") {
                socket.emit('submit message', {'selection':selection});
                document.getElementById("input-field").value = "";
            }
            
        }});
    
    // in coming
    socket.on('announce message', data => {

        // get time
        var d = new Date();
        var m = d.getMinutes();
        var h = d.getHours();
        var s = d.getSeconds();

        var time = h+":"+m+":"+s+":";

        //creating a new element to manipulate and set to data.selection
        var li = document.createElement('li');
        li.innerHTML = `${time} ${data.selection}`;
        document.getElementById("chatArea").append(li);

    });

});

