
Vue.component('gheader', {
    props: [ 'pagename', 'color' ],
    template: `
        <header>
            <div id="header-content">
                <div id="header-name">
                    <div id="header-name-mike">Mike</div>
                    <div id="header-name-page" v-if="pagename" :style="'--ccolor:'+color" v-html="pagename"></div>
                </div>
                <div id="header-nav">
                
                </div>
            </div>
        </header>
    `
});

Vue.component('gfooter', {
    props: [ ],
    template: `
        <footer>
            <div id="footer-content">
            </div>
        </footer>
    `
});