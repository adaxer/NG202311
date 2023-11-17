export class ResultPage<T> {
  pageSize: number;
  page: number;
  totalCount: number;
  data: T[];

  constructor() {
      this.pageSize = 0;
      this.page = 0;
      this.totalCount = 0;
      this.data = [];
  }
}
