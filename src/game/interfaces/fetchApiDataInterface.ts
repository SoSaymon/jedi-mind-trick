export interface FetchApiDataInterface {
    url: string;
    category: string;
    apiData?: JSON;
    fetchApiData: () => void;

    setUrl: (url: string) => void;
    setCategory: (category: string) => void;
}