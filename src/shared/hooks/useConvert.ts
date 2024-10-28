import Papa from "papaparse";
import {utils, write} from "xlsx";

export const useConvert = () => {
  const writeHandler = (csv: any) => {
    const parsedData = Papa.parse(csv, {
      header: true,
      delimiter: ",",
    });
    const ws = utils.json_to_sheet(parsedData.data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    return write(wb, {type: "array", bookType: "xlsx"})
  }

  return {
    write: writeHandler,
  }
};
