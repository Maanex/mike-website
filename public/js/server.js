

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
        chunks: [],
        search: '',
        notfound: false,
        visibleChunks: [],
        chunkHeights: []
    },
    methods: {
        lestyle: function(index) {
            var color;
            switch (index) {
                case 1: color = 'FFD427'; break;
                case 2: color = 'CBDEFF'; break;
                case 3: color = 'D3C589'; break;
                default: color = 'B3B3B3';
            }
            return `--ccolor:#${color};`;
        },
        lcstyle: function(index, size) {
            let height = 99 * size - 3;
            if (index == 0) height -= 20;
            height = this.chunkHeights[index] || height;
            return `height: ${height}px; padding: 0 !important`;
        }
    },
    watch: {
        search: function(query) {
            app.visible = query ? [] : app.users;
            if (query) {
                query = query.toLowerCase();
                for (var u of app.users) {
                    if (`${u.name.toLowerCase()}#${u.discrim}`.includes(query))
                        app.visible.push(u);
                }
            }
        },
        visible: function(visible) {
            app.chunks = [];
            app.visibleChunks = [];
            if (!visible.length) return;
            let cchunk;
            let pos = 0;
            wh: while (true) {
                cchunk = [];
                for (i = 0; i < 20; i++) {
                    if (!visible[pos + i]) {
                        app.chunks.push(cchunk);
                        app.visibleChunks.push(false);
                        break wh;
                    }
                    cchunk.push(visible[pos + i]);
                }
                app.chunks.push(cchunk);
                app.visibleChunks.push(false);
                pos += 20;
            }
            Vue.set(app.visibleChunks, 0, true);
            Vue.set(app.visibleChunks, 1, true);
        }
    }
});


// paralax effect on server banner
var docHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var docWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
window.addEventListener('scroll', e => {
    if (app.server.banner && docWidth >= 1000) {
        var scroll = window.scrollY;
        var scrollPer = Math.min(1, scroll / (docHeight / 5));
        document.getElementById('background-banner').style.transform = `translateY(${scroll/2}px)`;
        document.getElementById('background-banner-img').style.opacity = 1-scrollPer;
    }
});


// request the leaderboard data
function requestData() {
    var serverid = window.location.href.split('server/')[1] || '0';
    var url = `/api/server/${serverid}`;
    fetch(url)
        .catch(failedLoading)
        .then(r=>r.json())
        .catch(failedLoading)
        .then(data => {
            if (!data || !data.success) {
                failedLoading();
                return;
            }

            app.server.icon = `https://cdn.discordapp.com/icons/${data.server.id}/${data.server.icon}.png?size=128`;
            app.server.name = data.server.name;
            app.server.verified = data.server.features.includes('VERIFIED');
            app.server.banner = `https://cdn.discordapp.com/splashes/${data.server.id}/${data.server.splash}.jpg?size=2048`;

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

// when data is not loaded, bad.
function failedLoading() {
    app.server.name = 'Server not found!';
    app.server.icon = '/public/img/emoji.png';
    app.server.banner = '/public/img/windows.jpg';
    app.notfound = true;
    document.body.classList.add('loaded');
}

requestData();


let leaderboardBox = document.getElementById('leaderboard-box');
let boxHeight = app.chunkHeights[1] || 1977;
window.addEventListener('scroll', e => {
    let scrollTop = leaderboardBox.getBoundingClientRect().top;
    for (let i = 0; i < app.chunks.length; i++) {
        let chunkUpper = scrollTop + boxHeight * i - boxHeight / 2;
        let chunkLower = chunkUpper + boxHeight * 2;
        let current = app.visibleChunks[i];
        let visible = false;
        if (chunkUpper < window.innerHeight && chunkLower > 0) visible = true;
        if (current && !visible && !app.chunkHeights[i])
            app.chunkHeights[i] = leaderboardBox.children[i].offsetHeight - 3;
        if (current != visible) Vue.set(app.visibleChunks, i, visible);
    }
});