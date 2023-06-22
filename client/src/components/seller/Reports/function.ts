import { IReport } from "../../../types/reports/types";

export const summerQuantityFunction = (reports: IReport[], id: number) => {
    return reports.filter((el) => el.good_id === id).reduce((acc, cur) => acc + cur.quantity, 0)
}

export const imgFunction = (reports: IReport[], id: number) => {
    return reports
      .map((el) => {
        if (el.good_id === id) {
          return el.Good?.img_url;
        }
      })
      .filter((el) => el !== undefined);
  };

  export const nameFunction = (reports: IReport[], id: number) => {
    return reports
      .map((el) => {
        if (el.good_id === id) {
          return el.Good?.name;
        }
      })
      .filter((el) => el !== undefined);
  };

  export const profitFunction = (reports: IReport[], id: number, quant: number) => {
    return reports
      .map((el) => {
        if (el.good_id === id) {
          return el.Good?.price * quant;
        }
      })
      .filter((el) => el !== undefined);
  };