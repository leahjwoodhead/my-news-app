import axios from 'axios'

const ncNewsApi = axios.create({
    baseURL: 'https://leahs-news-app.herokuapp.com/api/'
})

export const fetchTopics = () => {
    return ncNewsApi.get("/topics").then((res) => {
        return res.data.topics
    })
}

export const fetchArticles = (topic, limit, sort_by, order, p) => {
    return ncNewsApi.get("/articles",  {
        params: {
            topic: topic,
            limit: limit,
            sort_by: sort_by,
            order: order,
            p: p
    }}).then((res) => {
        return res.data.articles
    })
}

export const fetchArticleById = (id) => {
    return ncNewsApi.get(`/articles/${id}`).then((res) => {
        return res.data.article
    })
}

export const fetchCommentsById = (id, limit, sort_by, order) => {
    return ncNewsApi.get(`/articles/${id}/comments`, {
        params: {
            limit: limit,
            sort_by: sort_by,
            order: order
        }
    }).then((res) => {
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

export const addVotesToArticle = (id, inc) => {
    const votes = {
        inc_votes: 0
    }
    if (inc === 'up') votes.inc_votes++
    if (inc === 'down') votes.inc_votes--
    return ncNewsApi.patch(`articles/${id}`, votes)
}

export const addVotesToComment = (id, inc) => {
    const votes = {
        inc_votes: 0
    }
    if (inc === 'up') votes.inc_votes++
    if (inc === 'down') votes.inc_votes--
    return ncNewsApi.patch(`comments/${id}`, votes)
}

export const deleteArticle = (id) => {
    return ncNewsApi.delete(`articles/${id}`).then(() => {
        console.log("DELETED")
    })
}

export const addArticle = (title, topic, text, username) => {
    const formattedArticle = {
        title: title,
        body: text,
        topic: topic,
        author: username
    }
    console.log(formattedArticle)
    return ncNewsApi.post('articles', formattedArticle).then((res) => {
        return res.data.article
    }) 
}