import { apiInstance } from "../constants/apiInstance";
import { RandomUser } from "../types";

const api = apiInstance.create({
    baseURL: "https://randomuser.me/api"
});

export const manageUser = {
    getUser: (page: number) =>
        api.get<HttpResponse<RandomUser>>(`/?page=${page}&results=10`)
};
