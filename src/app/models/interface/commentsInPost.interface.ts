import { Comment } from "./comment.interface";

export interface  CommentsInPost{
    postId:number;
    comments:Comment[];
}