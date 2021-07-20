export class IPageRequest {
    page: number;
    per_page: number;
    total_objects?: number;
    search?: string;
    sort?: string;
    typeSort?: number;
}

