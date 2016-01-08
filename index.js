import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import Base62 from 'base62';

import FalcorServer from 'falcor-express';
import FalcorRouter from 'falcor-router';

// import urlService from './url_service';

const app = express();

var data = {
  links: []
};

const LinksRouter = FalcorRouter.createClass([
  {
    route: 'links["url", "hash"]',
    get: (pathSet) => {
      console.log("==> 🔍  pathSet:", pathSet)
      return pathSet[1].map(function(key) {
        return {
          path: ["links", key],
          value: data.links[key]
        };
      });
      return results
    }
  },
  {
    route: 'links.length',
    get: () => {
      return {
        path: ['links', 'length'],
        value: data.links.length
      }
    }
  },
  {
    route: 'links.push',
    call: (callPath, args) => {
      console.log(callPath, args);
      const hash = Base62.encode(data.links.length);
      const url = args;

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
  }
]);

app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', FalcorServer.dataSourceRoute(() => new LinksRouter()));
app.use(express.static('public'));

app.get('/*', function (req, res) {
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

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
