const keyAPI = '29872445-b11cb18030e5a7e55f6afbc9a';
const BASE_URL = 'https://pixabay.com/api/';

function fetchPicturesByName(name) {
  let url = `${BASE_URL}?key=${keyAPI}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error());
    }
    return response.json();
  });
}

export default { fetchPicturesByName };
