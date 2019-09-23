
// Vue.component('temp', {
//     props: [ ],
//     template: '#t-temp'
// });

var app = new Vue({
    el: '#app',
    data: {
        server: {
            icon: '',
            name: '',
            verified: false
        }
    }
});


function requestData() {
    var serverid = '440553300203667477'; //todo
    var url = `/api/server/${serverid}.json`;
    fetch(url)
        .then(r=>r.json())
        .then(data => {
            app.server.icon = `https://cdn.discordapp.com/icons/${data.server.id}/${data.server.icon}.png?size=128`;
            app.server.name = data.server.name;
            app.server.verified = data.server.features.includes('VERIFIED');

            doneLoading();
        });
}

function doneLoading() {
    document.body.classList.add('loaded');
}

requestData();