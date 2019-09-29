



Vue.component('serverframe', {
    props: [ 'name', 'members', 'icon', 'banner', 'verified' ],
    template: '#t-serverframe'
});


var app = new Vue({
    el: '#app',
    data: {
        serverlist: [
            {
                name: 'Rexcellent Games',
                members: 142,
                icon: 'https://cdn.discordapp.com/icons/440553300203667477/93803523f5d9bdc8ca6c775d5368639d.png?size=128',
                banner: 'https://cdn.discordapp.com/splashes/440553300203667477/7dccff92a50aaf23e82833614087cd68.jpg?size=2048',
                verified: true
            },
            {
                name: 'Double Trouble',
                members: 123,
                icon: 'https://cdn.discordapp.com/icons/466179424291651614/9a97c218e702cfcf263a37ac71152b87.webp?size=128',
                banner: 'https://cdn.discordapp.com/banners/466179424291651614/0750b35abd34c2abb7679521aa8bd0f9.jpg?size=512',
                verified: true
            },
            {
                name: 'Badosz',
                members: 78,
                icon: 'https://cdn.discordapp.com/icons/340947847728070666/ee7eca19a2b8cda6fdde8303396d7377.webp?size=128',
                banner: '',
                verified: false
            },
            {
                name: 'Tank Maniacs',
                members: 139,
                icon: 'https://cdn.discordapp.com/icons/537977157780111360/d49202d376445cc4ba4538bca2a2a4c4.webp?size=128',
                banner: 'https://cdn.discordapp.com/splashes/537977157780111360/2beccb47aeafc1cbb11c3e62be493945.jpg?size=512',
                verified: true
            },
        ]
    }
});


function loadServerlist() {
    fetch('/api/servers')
        .then(res => res.json)
        .then(json => json.length&&Vue.set(app, 'serverlist', json));
}
loadServerlist();


function scrollServerlist(right) {
    var el = document.getElementById('serverlist-scroll');
    var val = right ? 700 : -700;
    for (var i = 0; i < 14; i++) {
        setTimeout(() => {
            el.scrollTo(el.scrollLeft+val/i, 0);
        }, i * 20);
    }
}

function scrollToContent() {
    var dest = document.getElementById('contentScroll').getBoundingClientRect().top - 30;
    for (var i = 0; i < 20; i++) {
        setTimeout(() => {
            window.scrollTo(0, window.scrollY + (dest - window.scrollY) / 7);
        }, i * 20);
    }
}