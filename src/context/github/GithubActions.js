import axios from "axios"
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_URL,
    headers:{
        Authorization: `token ${GITHUB_TOKEN}`
    }
})

// Get Search users
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text,
    })

    // GET USERS DATA USING FETCH API 
    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    //     headers:{
    //         Authorization: `token ${GITHUB_TOKEN}`
    //     }
    // })

    // const { items } = await response.json()

    // return items

    // GET USERS DATA USING AXIOS
    const response = await github.get(`/search/users?${params}`)
    return response.data.items
}

// GET SINGLE USER AND REPOS
export const getUserAndRepos = async (login) =>{
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {
        user: user.data,
        repos: repos.data
    }
}

// // Get Single user
// export const getUser = async (login) => {

//     const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//         headers:{
//             Authorization: `token ${GITHUB_TOKEN}`
//         }
//     })

//     if(response.status === 404){
//         window.location = '/notfound'
//     }else{

//         const data = await response.json()

//         return data
//     }

// }

// // Get user Repos
// export const getUserRepos = async (login) => {

//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page:10,
//     })

//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//         headers:{
//             Authorization: `token ${GITHUB_TOKEN}`
//         }
//     })

//     const data = await response.json()

//     return data
// }