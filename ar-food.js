var router = require('express').Router();

router.get('/', (req, res) => {
    var model;

    if(req.query.m){
        model = require('./static/models/'+req.query.m+'.json');
    }

    if(model !== undefined){
        res.render('ar-food', {
            title: 'AR-Food',
            model: model,
            modelName: req.query.m
        });
    }
    else{
        res.sendStatus(404);
    }
});

module.exports = router;