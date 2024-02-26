const axios = require('axios');

const url = 'https://api.air.fail/public/image/kandinsky';
const headers = {'Authorization': 'sk-xO18losgvhelwfpS1oGTBOxLYgH7b'};
const data = {
  content: 'пицца состоящая из:перец,сыр,курица,пепперони,круглое тесто;вид сверху,расстояние 40 см,цвет фона черный',
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error.response.data));