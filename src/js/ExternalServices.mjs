const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  console.log(res)
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {

  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    //console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    console.log(options)
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}

async getData(query) {
  const response = await fetch(`${this.baseURL}/products/search?q=${query}`);
  const data = await response.json();
  return data.Result || data;
}