import axios from "axios";

export function fetchPoem(
  endpoint,
  number,
  callback
) {
  axios({
    method: "GET",
    url: `/api/${endpoint}/${number}`,
  })
    .then((response) => {
      console.log(
        `${endpoint} response.data:`,
        response.data
      );
      const poem = Number(
        response.data[0][
          endpoint === "lastpoem" ? "max" : "min"
        ]
      );
      console.log(
        `Poem ${poem} will be ${endpoint}`
      );
      callback(poem);
    })
    .catch((error) => {
      console.log(`Error in ${endpoint}:`, error);
    });
}
