import searchResult from "../types/search-result";

const getUTCSecondsSinceEpoch = (date: Date) =>
  Math.round((date.getTime() + date.getTimezoneOffset() * 60 * 1000) / 1000);
function formatData(statuses: any): searchResult[] {
  return statuses
    .map((status: any) => ({
      created_at: new Date(status.created_at),
      id: status.id_str,
      text:
        status.full_text.lastIndexOf("http") === -1
          ? status.full_text
          : status.full_text.slice(0, status.full_text.lastIndexOf("http")),
      hash_tags: status.entities.hashtags.map((hashTag: any) => hashTag.text),
      user_screen_name: status.user.screen_name,
      image_url: status.user.profile_image_url,
      tweet_url: status.full_text.slice(
        status.full_text.lastIndexOf("http"),
        status.full_text.length
      ),
    }))
    .sort((result1: searchResult, result2: searchResult) => {
      return (
        getUTCSecondsSinceEpoch(result2.created_at) -
        getUTCSecondsSinceEpoch(result1.created_at)
      );
    });
}

function getAllHashTags(statuses: any): Set<string> {
  return new Set(
    statuses.reduce(
      (hashTags: string[], status: any) => [...hashTags, ...status.hash_tags],
      []
    )
  );
}

export { formatData, getAllHashTags };
