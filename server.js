const express = require('express');
const app = express();
const PORT = 8000;
const pathName = {
    root: __dirname + '/public/',
    dotfiles: 'deny'
};

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.get('/', (req, res) => {
    res.sendFile('colendarHome.html', pathName);
    
});
app.get('/:path', (req, res) => {
    const path = req.params.path;
	if (path == "signup") {
        res.sendFile('formpage.html', pathName);
    } else if (path == "profile") {
        res.sendFile('profile.html', pathName);
    } else if (path == 'login') {
        res.sendFile('login.html', pathName);
    } else if (path == 'plan') {
        res.sendFile('plan.html', pathName);
    } else {
        res.status(404).send("NOT FOUND");
    }
	
});
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
});