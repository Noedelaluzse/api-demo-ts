export class PaginationDto {

  private constructor (
    public readonly page: number,
    public readonly limit: number,
    public readonly initinialData: boolean
  ) {}
  
  static create(page: number= 1, limit: number= 10, initinialData=false): [string?, PaginationDto?] {
    
    if (isNaN(page) || isNaN(limit)) return ['Page and Limit must be numbers', undefined];

    if (page < 1) return ['Page must be greater than 0', undefined];
    if (limit < 1) return ['Limit must be greater than 0', undefined];
    
    return [undefined, new PaginationDto(page, limit, initinialData)];
  }
}