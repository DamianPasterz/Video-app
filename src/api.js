export const baseUrl = () => "https://www.googleapis.com/youtube/v3/videos?id=";
export const params = () => "part=snippet,statistics";
export const key = () => process.env.REACT_APP_GOOGLE_API_KEY.toString();
export default baseUrl;
