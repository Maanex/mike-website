

var app = new Vue({
    el: '#app',
    data: {
        server: {
            icon: '',
            name: '',
            verified: false,
            banner: ''
        },
        users: [],
        visible: [],
        search: ''
    },
    methods: {
        lestyle: function(index) {
            var color;
            switch (index) {
                case 0: color = 'FFD427'; break;
                case 1: color = 'CBDEFF'; break;
                case 2: color = 'D3C589'; break;
                default: color = 'B3B3B3';
            }
            return `--ccolor:#${color};`;
        }
    },
    watch: {
        search: function(query) {
            app.visible = query ? [] : app.users;
            if (query) {
                query = query.toLowerCase();
                for (var u of app.users) {
                    if (`${u.name.toLowerCase()}#${u.discrim}`.startsWith(query))
                        app.visible.push(u);
                }
            }
        }
    }
});


// paralax effect on server banner
var docHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
window.addEventListener('scroll', e => {
    if (app.server.banner) {
        var scroll = window.scrollY;
        var scrollPer = Math.min(1, scroll / (docHeight / 5));
        document.getElementById('background-banner').style.transform = `translateY(${scroll/2}px)`;
        document.getElementById('background-banner-img').style.opacity = 1-scrollPer;
    }
});

// request the leaderboard data
function requestData() {
    var serverid = window.location.href.split('leaderboard/')[1];
    var url = `/api/server/${serverid}.json`;
    fetch(url)
        .then(r=>r.json())
        .then(data => {
            app.server.icon = `https://cdn.discordapp.com/icons/${data.server.id}/${data.server.icon}.png?size=128`;
            app.server.name = data.server.name;
            app.server.verified = data.server.features.includes('VERIFIED');
            app.server.banner = `https://cdn.discordapp.com/banners/${data.server.id}/${data.server.splash}.jpg?size=2048`;

            var count = 1;
            for (var u of data.users) {
                app.users.push({
                    name: u.username,
                    discrim: u.discrim,
                    avatar: u.avatar,
                    xp: u.xp,
                    xpNeed: u.xpNeed,
                    level: u.level,
                    rank: count++
                });
            }
            app.visible = [...app.users];

            doneLoading();
        });
}

// when data is loaded and parsed
function doneLoading() {
    document.body.classList.add('loaded');
}

requestData();