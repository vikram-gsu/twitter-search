type searchResult = {
    created_at: Date,
    id: string,
    image_url: string,
    user_screen_name: string,
    text: string,
    tweet_url: string,
    hash_tags: string[]
}

export default searchResult;