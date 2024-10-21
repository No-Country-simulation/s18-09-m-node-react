export class sessionHelper {
  private constructor() {}

  public static getTotalExpectedTime(start_time: Date, end_time: Date): number {
    return Math.floor((end_time.getTime() - start_time.getTime()) / 1000 / 60);
  }

  public static dateConverter(dateTime: any): Date {
    return new Date(dateTime);
  }
}
