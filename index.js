import morgan from 'morgan';
import bodyParser from 'body-parser'
import Base62 from 'base62';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';

import express from 'express';
const app = express();

// import urlService from './url_service';

var data = {
  links: []
};

const LinksRouter = Router.createClass([{
  route: 'links["url", "hash"]',
  get: (pathSet) => {
    return pathSet[1].map(function(key) {
      return {
        path: ["links", key],
        value: data.links[key]
      };
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
  // Shorten links
  route: 'links.push',
  call: (callPath, args) => {
    const hash = Base62.encode(data.links.length);
    const url = args;

    data.links.push({
      hash: hash,
      url: url
    })

    return [{
      path: ['links', data.links.length - 1, 'url'],
      value: url
    }, {
      path: ['links', data.links.length - 1, 'hash'],
      value: hash
    }, {
      path: ['links', 'length'],
      value: data.links.length
    }];
  }
}]);

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/model.json', falcorExpress.dataSourceRoute(() => new LinksRouter()));
app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
  var linkFound = false;
  data.links.forEach(link => {
    if (link['hash'] === req.params[0]) {
      res.redirect(link['url']);
      linkFound = true;
      return;
    }
  });
  if (!linkFound) res.redirect('/');
});

var server = app.listen(3000, () => {
  console.log('http://localhost:3000');
});
