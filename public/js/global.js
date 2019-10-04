
Vue.component('gheader', {
    props: [ 'pagename', 'color' ],
    template: `
        <header>
            <div id="header-content">
                <div id="header-name">
                    <a href="/" id="header-name-mike">Mike</a>
                    <div id="header-name-page" v-if="pagename" :style="'--ccolor:'+color" v-html="pagename"></div>
                </div>
                <div id="header-nav">
                    <a class="nav-button" href="/team">Team</a>
                    <a class="nav-button" href="https://discord.gg/hfGSb8y">Support</a>
                    <a class="nav-button" href="/commands">Commands</a>
                    <a class="nav-button border" href="https://discordapp.com/oauth2/authorize?client_id=419620594645073930&permissions=8&scope=bot">Invite</a>
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
                <div class="footer-column">
                    <h3>Mike</h3>
                    <p>Copyright &copy; 2019 Badosz</p>
                    <p>All rights reserved.</p>
                    <a href="https://maanex.tk/">Website by Maanex</a>
                </div>
                <div class="footer-column">
                    <h3>Support</h3>
                    <a href="/faq">FAQ</a>
                    <a href="https://discord.gg/hfGSb8y">Support Discord</a>
                    </div>
                    <div class="footer-column">
                    <h3>Legal</h3>
                    <a href="/terms">Terms</a>
                    <a href="/privacy">Privacy</a>
                    <a href="mailto:contact@mikebot.xyz">Send an Email</a>
                </div>
                <div class="footer-column">
                    <h3>More</h3>
                    <a href="/team">The Team</a>
                    <a href="https://github.com/mike-boat/mike">Mike Sourcecode</a>
                </div>
            </div>
        </footer>
    `
});