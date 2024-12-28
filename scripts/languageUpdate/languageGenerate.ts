const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const { forEach, set } = require("lodash");
const _dirname = path.resolve();
const dayjs = require("dayjs");

const schema: any = {
  category: "category",
  key: "key",
};

const writeFile = (langPath: string, data: { [key: string]: object }) => {
  forEach(data, (localize: any, lang: string) => {
    const filePath = path.join(_dirname, langPath, `translation.${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(localize, null, 2));
  });
};

function languageUpdate() {
  const config = {
    csvFile: "language.csv",
    support: ["ko", "en"],
    outputPath: "translation/translations",
  };

  config.support.forEach((lang: any) => {
    if (schema[lang] === undefined) {
      schema[lang] = lang;
    }
  });

  const localize: any = {};
  config.support.forEach((lang: any) => {
    localize[lang] = {};
  });

  const csvFilePath = path.join(_dirname, config.csvFile);

  fs.createReadStream(csvFilePath)
    .pipe(csv.parse({ headers: true }))
    .on("data", (row: any) => {
      try {
        const key = [...row[schema.category].split("/"), row[schema.key]];

        if (
          !Number.isNaN(parseInt(row[schema.key])) &&
          typeof parseInt(row[schema.key]) === "number"
        ) {
          console.warn(
            `${row[schema.category]}-${
              row[schema.key]
            } is not valid. Change the key or category.`
          );
          return;
        }

        config.support.forEach((lang: any) => {
          if (row[lang] !== undefined) {
            set(localize[lang], key, row[lang]);
          }
        });
      } catch (error) {
        console.error("Error processing row:", row, error);
      }
    })
    .on("end", () => {
      try {
        writeFile(config.outputPath, localize);
        console.info(
          `${config.csvFile} has been processed.`,
          dayjs().format("YYYY-MM-DD HH:mm:ss")
        );
      } catch (error) {
        console.error("Error writing files:", error);
      }
    })
    .on("error", (error: any) => {
      console.error("Error reading CSV file:", error);
    });
}

languageUpdate();
