import { store } from "./state/store";

export interface IArticleFromResponse {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface IArticle extends IArticleFromResponse {
    likes: number;
    dislikes: number;
    liked: boolean;
    disliked: boolean;
}

export interface IMainState {
    articles: IArticle[],
    searchedArticlesIds: number[] | null,
    currentArticleId: number | null;
    rejected: boolean,
    pending: boolean
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;