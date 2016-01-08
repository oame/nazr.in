import Falcor from 'falcor';
import FalcorDataSource from 'falcor-http-datasource';

export default new Falcor.Model({
  source: new FalcorDataSource('/model.json')
});
