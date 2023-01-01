import {FetchApiDataInterface} from "../interfaces/fetchApiDataInterface";
import axios from "axios";

export class FetchApiData implements FetchApiDataInterface {
    url: string;
    category: string;
    apiData?: JSON;
    constructor(url: string, category: string) {
        this.url = url;
        this.category = category;
    }
    fetchApiData() {
        axios.get(this.url)
            .then(response => {
                this.apiData = response.data;
                console.log(this.apiData);
            })
            .catch(error => {
                console.error(error);
            })
    }
    setUrl(url: string) {
        this.url = url;
    }
    setCategory(category: string) {
        this.category = category;
    }
}