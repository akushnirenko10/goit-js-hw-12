import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

const perPage = 15;

export async function getImagesByQuery(query, page) {
  const { data } = await axios('api/', {
    params: {
      key: '57748887-33fc44c7a6eadcbc503de0d7e',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    },
  });
  return data;
}
