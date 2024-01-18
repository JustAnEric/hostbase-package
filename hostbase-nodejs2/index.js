const path = require("path");
const fs = require('fs');
const { io } = require("socket.io-client");

var depid = null;
var uid = null;
global.depid = depid;
global.uid = uid;

fs.readFile(path.resolve('./info.json'), {}, (err,data) => { if (err) throw err; global.depid=JSON.parse(data)['deployment_id']; global.uid=JSON.parse(data)['uid'] });

class StaticWebsite {
    constructor() {
        console.log("Waiting until HostBase deployment is ready...");
        this.socket = io("https://undisturbed-cichlid-7543.dataplicity.io/deployment-server");
        console.log(`Connecting via deployment server: /deployment-server/0`)
        setTimeout(() => {
            console.log(`Deployment ID: ${global.depid}`);
            console.log(`* Starting HostBase...`);
            console.log(`STATUS: Offline`);

            this.socket.connect();
        },2000);
    }

    run() {
        console.log(`STATUS: Online`);
    }

    setupEvents() {
        this.socket.on("connect", () => {
            console.log(`Communication successful! Socket ID is ${this.socket.id}`);
            console.log(`Sending message initialisation data...`);
            this.socket.emit('connection',JSON.stringify({ type: "connection", uid: global.uid, did: global.depid }));
        });

        this.socket.on("disconnect", () => {
            console.log(`Uh oh! Socket has disconnected.`);
        });

        this.socket.on("reconnect_attempt", () => {
            console.log(`Trying to reconnect, website is offline.`);     
        });          
    }
}

module.exports = { StaticWebsite };