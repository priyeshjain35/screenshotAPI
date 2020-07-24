function handleCapture() {
    const url = document.getElementById("searchUrl").value;
    const reqEndPoint = `http://localhost:7000/screenshot?${url}`;
    let myWindow = window.open('', '_blank');
    myWindow.document.write('Loading Preview....');
    $.get(reqEndPoint, function(data, status) {
        myWindow.location.href = data.url;
        myWindow.focus();
    })
}