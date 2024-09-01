import axios from 'axios';

const base = 'https://api.themoviedb.org/3';

let headers = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_KEY}`,
};

async function getPersons(id) {
  let URI = `${base}/movie/${id}/credits`;

  try {
    let response = await axios.get(URI, {
      params: {
        language: 'en-US',
      },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getPersonInfo(id) {
  let URI = `${base}/person/${id}`;

  try {
    let response = await axios.get(URI, {
      params: {
        language: 'en-US',
      },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getPersonMovies(id) {
  let URI = `${base}/person/${id}/movie_credits`;

  try {
    let response = await axios.get(URI, {
      params: {
        language: 'en-US',
      },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export { getPersons, getPersonInfo, getPersonMovies };
