import { API_BASE } from "../consts";
import axios from "axios";

export type VideoType = {
    id: number,
    duration: number,
    title: string,
    preview: string,
    src: string | null
}

class VideoApi {
    
    async getPage(page: number = 1, count: number = 12) : Promise<VideoType[]>
    {
        let result : VideoType[] = [];
        try {
            await axios.get(`${API_BASE}/video/get_page?page=${page}&count=${count}`)
                .then((res : any) => {
                    if (res.data)
                        result = res.data;
                })
                .catch(ex => console.log(ex));
        } catch (ex) {console.log(ex);}

        return result;
    }

    async getSrc(id: number) : Promise<string> {
        let result = '';
        try {
            await axios.get(`${API_BASE}/video/get?id=${id}`)
                .then((res: any) => result = res.data?.src ?? '');
        } catch (ex) {console.log(ex)}
        return result;
    }

}

export default new VideoApi();