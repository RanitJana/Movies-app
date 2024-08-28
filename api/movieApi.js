import axios from "axios";

const base = 'https://api.themoviedb.org/3'

let headers = {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_KEY}`
}

async function getTrending() {

    let URI = `${base}/trending/movie/week`;

    try {

        let response = await axios.get(URI, {
            params: {
                language: 'en-US'
            },
            headers: headers
        })

        return response.data.results;

    } catch (error) {

        console.log(error);
        return [];

    }
}
async function getUpcoming(page = 1) {

    let URI = `${base}/movie/upcoming`;

    try {

        let response = await axios.get(URI, {
            params: {
                language: 'en-US',
                page: page
            },
            headers: headers
        })

        return response.data.results;

    } catch (error) {

        console.log(error);
        return [];

    }
}
async function getTopRated(page = 1) {

    let URI = `${base}/movie/top_rated`;

    try {

        let response = await axios.get(URI, {
            params: {
                language: 'en-US',
                page: page
            },
            headers: headers
        })

        return response.data.results;

    } catch (error) {

        console.log(error);
        return [];

    }
}
async function getPopular(page = 1) {

    let URI = `${base}/movie/popular`;

    try {

        let response = await axios.get(URI, {
            params: {
                language: 'en-US',
                page: page
            },
            headers: headers
        })

        return response.data.results;

    } catch (error) {

        console.log(error);
        return [];

    }
}

async function getMovie(id) {

    let URI = `${base}/movie/${id}`;

    try {

        let response = await axios.get(URI, {
            params: {
                language: 'en-US'
            },
            headers: headers
        })
        return response.data;

    } catch (error) {

        console.log(error);
        return [];

    }
}

export {
    getTrending,
    getUpcoming,
    getTopRated,
    getPopular,
    getMovie
}