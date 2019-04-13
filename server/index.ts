import * as http from 'http';
import app from './app';

app.set('port', (process.env.PORT || 3000));

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('ADOPeT server is listening on port ' + app.get('port'));
});
