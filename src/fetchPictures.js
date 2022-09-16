const keyAPI = '29872445-b11cb18030e5a7e55f6afbc9a';
const BASE_URL = 'https://pixabay.com/api/';
let page = 1;

function fetchPicturesByName(name) {
  let url = `${BASE_URL}?key=${keyAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error());
    }
    page += 1;
    return response.json();
  });
}

export default { fetchPicturesByName };
