const dummy = (blogs) => {
    return 1 
}

const totalLikes = (blogs) => {

    const amount = blogs.length === 0 ? 0 : blogs.reduce((acc, cv) => acc + cv.likes, 0)

    return amount
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }

    let favorite = blogs.find(() => true)

    if(blogs.length === 1){
        return favorite
    }

    blogs.forEach(element => {
        if(element.likes > favorite.likes){
            favorite = element
        }
    });
    
    return favorite
}

const highestAuthorBlogs = (blogs) => {
    const authorMap = new Map()
    const highestAuthor = {author: null, blogs : 0}

    blogs.forEach(blog => {
        let currentValue = authorMap.get(blog.author)
        if(currentValue === undefined){
            authorMap.set(blog.author, 1)
            return

        }
        currentValue = currentValue + 1
        authorMap.set(blog.author, currentValue)
        if(currentValue > highestAuthor.blogs){
            highestAuthor.author = blog.author
            highestAuthor.blogs = currentValue

        }
    })
    return highestAuthor
}

const mostLikes = (blogs) => {
    const authorMap = new Map()
    const highestAuthor = {author: null, likes : 0}

    blogs.forEach(blog => {
        let currentValue = authorMap.get(blog.author)
        if(currentValue === undefined){
            authorMap.set(blog.author, blog.likes)
            return

        }
        currentValue = currentValue + blog.likes
        authorMap.set(blog.author, currentValue)
        if(currentValue > highestAuthor.likes){
            highestAuthor.author = blog.author
            highestAuthor.likes = currentValue
   
        }

    })
    return highestAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    highestAuthorBlogs,
    mostLikes
}