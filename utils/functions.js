const { default: axios } = require("axios");

const filterData = (filePath) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const { createObjectCsvWriter } = require("csv-writer");

  const results = [];
  return new Promise((res, rej) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const modifiedData = {};
        for (const key in data) {
          modifiedData[key.toLowerCase()] = data[key].toLowerCase();
        }
        results.push(modifiedData);
      })
      .on("end", () => {
        const csvWriter = createObjectCsvWriter({
          path: filePath,
          header: Object.keys(results[0]).map((key) => ({
            id: key,
            title: key,
          })),
        });
        csvWriter
          .writeRecords(results)
          .then(() => {
            res();
            console.log("CSV file has been modified and saved");
          })
          .catch((error) => {
            rej(error);
            console.error("Error writing CSV file:", error);
          });
      });
  });
};

const wait = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 1000 * 5);
  });
};

const convertToJson = (filePath) => {
  const csv = require("csv-parser");
  const fs = require("fs");

  const jsonData = [];
  return new Promise((res, rej) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        jsonData.push(data);
      })
      .on("end", () => {
        res(jsonData);
        console.log("CSV file has been converted to JSON");
      })
      .on("error", (error) => {
        rej(error);
        console.error("Error reading CSV file:", error);
      });
  });
};

const sendRequest = (data) => {
  return axios
    .post("https://workflowcsv.requestcatcher.com/test", data)
    .then((response) => {
      console.log("Data sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
};

module.exports = { filterData, wait, sendRequest, convertToJson };
