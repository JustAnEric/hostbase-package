(async () => {
    const hostbase = require('hostbase-nodejs');
    const app = new hostbase.StaticWebsite();

    const Response = hostbase.Resp;
    const Request = hostbase.Req;
    

    app.route('/', (req=Request, res=Response) => {
        res.headers
    });

    app.setupEvents();
    app.run();
})();