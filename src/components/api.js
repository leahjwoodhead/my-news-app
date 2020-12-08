import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: 'https://leahs-news-app.herokuapp.com/api/'
})

export const fetchTopics = () => {
    return ncNewsApi.get("/topics").then((res) => {
        return res.data.topics
    })
}

export const fetchArticles = (topic) => {
    return ncNewsApi.get("/articles",  {
        params: {
            topic: topic
    }}).then((res) => {
        return res.data.articles
    })
}

export const fetchArticleById = (id) => {
    return ncNewsApi.get(`/articles/${id}`).then((res) => {
        return res.data.article
    })
}

export const fetchCommentsById = (id) => {
    return ncNewsApi.get(`/articles/${id}/comments`).then((res) => {
        return res.data.comments
    })
}

export const postComment = (id, comment) => {
    return ncNewsApi.post(`/articles/${id}/comments`, comment).then((res) => {
        return res.data.comment
    })
}

export const deleteCommentById = (id) => {
    return ncNewsApi.delete(`/comments/${id}`)
}