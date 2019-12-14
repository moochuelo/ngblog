export interface CommentI {
   fullName?: string;
   email?: string;
   comment?: string;
}

export interface PostI{
   titlePost: string;
   contentPost?: string;
   imagePost?: any;
   id?: string;
   tagsPost?: string;
   fileRef?: string;
   datePost?: string;
   userUid?: string;
   statusPost?: boolean;
   likesPost?: number;
}
export class Post{
   titlePost: string;
   contentPost?: string;
   imagePost?: any;
   id?: string;
   tagsPost?: string;
   fileRef?: string;
}