import axios from "axios";

class ApiClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });

    this.client.interceptors.request.use((config) => {
      const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
      if (!token) {
        return Promise.reject(new Error("No authentication token found"));
      }
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  async request(method, url, data = {}, params = {}, contentType = "application/json") {
    try {
      const response = await this.client({
        method,
        url,
        data,
        params,
        headers: {
          "Content-Type": contentType, // Dynamic Content-Type
          Accept: contentType,
        },
      });

      if (response?.data?.code === 200 || response?.data?.code === 201) {
        return response.data;
      }
      throw new Error(response?.data?.message || "Unknown error occurred");
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  }

  get(url, params, contentType) {
    return this.request("GET", url, {}, params, contentType);
  }

  post(url, data, contentType) {
    return this.request("POST", url, data, {}, contentType);
  }

  put(url, data, contentType) {
    return this.request("PUT", url, data, {}, contentType);
  }

  delete(url, contentType) {
    return this.request("DELETE", url, {}, {}, contentType);
  }
}

export default ApiClient;
