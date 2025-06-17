import { User } from "./user.model";

export interface UserResponse{
    data: User[],
    totalCount: number
}