// Singular Document Image library utilising BSON
{
    imageID: {
        url: "/*s3 bucket*/",
        tags: ["Mike","bbq"]
        posts: [post1, post2,...],
        visibility:[level]
    }
}

// Indexes (optional)
// Tag db document
{
    "Mike": {
        posts: [post1, post2],
        images: [imageId1, imageId2]
    }
}
{
    "Bruce": {
        posts: [post1, post2],
        images: [imageId1, imageId2]
    }
}
{
    "bbq": {
        posts: [post1, post2],
        images: [imageId1, imageId2]
    }
}

// Posts
{
    "postId": {
        tags: [a,b,c,...],
        image: [x,y,z,...]
    }
}

// Image
{
    imageID: {
        url: "/*s3 bucket*/",
        tags: ["Mike","bbq"]
    }
}
