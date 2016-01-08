import express from 'express';
import FalcorExpress from 'falcor-express';
import Router from 'falcor-router';

// import Promise from 'promise';
import urlService from './url_service';
// import bodyParser from 'body-parser';


var data = {
  links: []
};

var LinksRouter = Router.createClass([{
  route: 'links["url", "hash"]',
  get: (pathSet) => {
    return pathSet[1].map(function(key) {
      return { path: ["links", key], value: data.links[key] };
    });
    return results
  }
}, {
  route: 'links.length',
  get: () => {
    return {
      path: ['links', 'length'],
      value: data.links.length
    }
  }
}, {
  route: 'links.add',
  call: (callPath, args) => {
    const hash = Base62.encode(data.links.length);
    const url = args[0];

    data.links.push({
      hash: hash,
      url: url
    })

    return [
      {
        path: ['links', data.links.length - 1, 'url'],
        value: url
      },
      {
        path: ['links', data.links.length - 1, 'hash'],
        value: hash
      },
      {
        path: ['links', 'length'],
        value: data.links.length
      }
    ];
  }
}]);

var app = express();

app.use('/model.json', FalcorExpress.dataSourceRoute(() => new LinksRouter()));

app.get('/*', function (req, res, next) {
  data.links.forEach(link =>{
    if (link['hash'] === req.params[0]) {
      res.redirect(link['url']);
    }
  });
  next();
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
