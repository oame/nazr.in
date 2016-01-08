import Promise from 'promise';
import PouchDB from 'pouchdb';
import path from 'path';
var urlsDB = new PouchDB(path.join(__dirname, 'urls_db'));
import Base62 from 'base62';

class URLService {
  getURLs(urlIDs) {
    return urlsDB.allDocs({
      keys: urlIDs
    })
  }

  createURL(url) {
    const hash = Base62.encode(url);
  }
}
