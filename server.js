import Falcor from 'falcor';
import FalcorServer from 'falcor-express';
import bodyParser from 'body-parser';
import express from 'express';
import Router from 'falcor-router';
import Redis from 'falcor-ioredis';
import Base62 from 'base62';

var app = express();
var data = {
  links: []
};

var NamesRouter = Router.createClass([{
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

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/model.json', FalcorServer.dataSourceRoute(() => new NamesRouter()));
app.get('/*', function (req, res, next) {
  data.links.forEach(link =>{
    if (link['hash'] === req.params[0]) {
      res.redirect(link['url']);
    }
  });
  next();
});
app.use(express.static('public'));
app.listen(9090, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('navigate to http://localhost:9090');
});
