import searchResult from "../types/search-results";

function formatData(statuses: any): searchResult {
  return statuses.map((status: any) => ({
    created_at: new Date(status.created_at),
    id: status.id_str,
    text: status.full_text.slice(0, status.full_text.lastIndexOf("http")),
    hash_tags: status.entities.hashtags.map((hashTag: any) => hashTag.text),
    user_screen_name: status.user.screen_name,
    image_url: status.user.profile_image_url,
    tweet_url: status.full_text.slice(
      status.full_text.lastIndexOf("http"),
      status.full_text.length
    ),
  }));
}

function getAllHashTags(statuses: any): string[] {
  return Array.from(
    new Set(
      statuses.reduce(
        (hashTags: string[], status: any) => [...hashTags, ...status.hash_tags],
        []
      )
    )
  );
}

export { formatData, getAllHashTags };
