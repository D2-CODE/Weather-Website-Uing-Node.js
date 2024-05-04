// console.log('hello');




const forcastform = document.querySelector('#forcastform')

forcastform.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = document.getElementById('location');
    fetch(`http://localhost:3000/weather?address=${loc.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                const lblerror = document.getElementById('lblError');
                lblerror.style.color = 'red'
                lblerror.innerHTML = data.error
                const forcastdata = document.getElementsByClassName('forcastdata')

                for (let i = 0; i < forcastdata.length; i++) {
                    forcastdata[i].innerHTML = '';
                }

            } else {
                console.log(data);
                // display the weather info on the
                const lblLocation = document.getElementById('lblLocation')
                const lbltemperature = document.getElementById('lbltemperature')
                const lblcondition = document.getElementById('lblcondition')
                const lblhumidity = document.getElementById('lblhumidity')
                const lblwind = document.getElementById('lblwind')
                const lblerror = document.getElementById('lblError');
                // lblerror.style.display = "none"
                lblerror.innerHTML = ""

                lblLocation.innerHTML = `Location: ${data.address}`
                lbltemperature.innerHTML = `Temperature: ${data.temperature} `
                lblcondition.innerHTML = `Condition: ${data.condition}`
                lblhumidity.innerHTML = `Humidity ${data.humidity}`
                lblwind.innerHTML = `Wind: ${data.wind}`
            }
        })
    })
})