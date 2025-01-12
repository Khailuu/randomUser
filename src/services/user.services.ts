import { MANAGE_USER_API } from "../constants/api";
import { apiInstance } from "../constants/apiInstance";
import { RandomUser } from "../types";

const api = apiInstance.create({
    baseURL: MANAGE_USER_API
});

export const manageUser = {
    getUser: (page: number) =>
        api.get<HttpResponse<RandomUser>>(`/?page=${page}&results=10`)
};
