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
      const poem = Number(
        response.data[0][
          endpoint === "lastpoem" ? "max" : "min"
        ]
      );
      callback(poem);
    })
}