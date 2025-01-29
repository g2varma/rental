"use server";

const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;
const X_CLIENT_SECRET = process.env.NEXT_PUBLIC_X_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AUTH_GET = async (url, nextConfig) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", X_API_KEY);
    myHeaders.append("X-Client-Secret", X_CLIENT_SECRET);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      next: { revalidate: 0, ...nextConfig },
    };

    const res = await fetch(`${BASE_URL}${url}`, requestOptions);
    if (!res?.ok) {
      const error = await res.json();
      console.log({ error });
      throw { ...error, errorCode: res?.status };
    }

    const data = await res?.json();
    console.log("SUCCESS", "AUTH_GET", url);
    return data;
  } catch (error) {
    console.log("FAILED", "AUTH_GET", url);
    console.log({ error });
    throw error;
  }
};
export const AUTH_FULL_URL_GET = async (url, nextConfig) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", X_API_KEY);
    myHeaders.append("X-Client-Secret", X_CLIENT_SECRET);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
      next: { revalidate: 0, ...nextConfig },
    };

    const res = await fetch(url, requestOptions);
    if (!res?.ok) {
      const error = await res.json();
      console.log({ error });
      throw { ...error, errorCode: res?.status };
    }

    const data = await res?.json();
    console.log("SUCCESS", "AUTH_GET", url);
    return data;
  } catch (error) {
    console.log("FAILED", "AUTH_GET", url);
    console.log({ error });
    throw error;
  }
};

export const AUTH_POST = async (url, payload, nextConfig) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("X-API-Key", X_API_KEY);
    myHeaders.append("X-Client-Secret", X_CLIENT_SECRET);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
      next: { revalidate: 0, ...nextConfig },
    };

    const res = await fetch(`${BASE_URL}${url}`, requestOptions);

    if (!res?.ok) {
      const error = await res.json();
      throw { ...error, errorCode: res?.status };
    }
    const data = await res?.json();
    console.log("SUCCESS", "AUTH_POST", url);

    return data;
  } catch (error) {
    console.log({ error });
    console.log("FAILED", "AUTH_POST", url);
    throw error;
  }
};
