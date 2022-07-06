function solve() {
    let stop = {
        next: 'depot'
    }
    const infoEl = document.getElementsByClassName('info')[0];
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    function depart() {
        //console.log('Depart TODO...');
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        fetch(url)
            .then(resp => resp.json())
            .then(d => {
                stop = JSON.parse(JSON.stringify(d));
                infoEl.textContent = `Next stop ${stop.name}`;
            })
            .catch(error => {
                infoEl.textContent = "Error"
            });
        arriveBtn.disabled = false;
    }

    function arrive() {
        //console.log('Arrive TODO...');
        infoEl.textContent = `Arriving at ${stop.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();