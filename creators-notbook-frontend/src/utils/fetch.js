import { redirect } from "react-router-dom";

const SERVER_URL = "http://localhost";

/**
 * Form 또는 Object의 데이터를 기반으로 서버로 GET 형식의 요청을 보낸다.
 * @param {String} url
 * @param {Form} data - optional : FormData
 * @returns 서버 반환 데이터가 포함된 Promise 객체.
 */
export function fetchByUrl(url, data) {
  if (data) {
    let queryString = "?";
    if (data instanceof Element || data instanceof Document) {
      queryString += new URLSearchParams(new FormData(data)).toString();
    } else {
      queryString += new URLSearchParams(data).toString();
    }
    return handleRequest(url + queryString, buildOptions("GET"));
  } else {
    return handleRequest(url,buildOptions("GET"));
  }
}

/**
 * 서버로 JSON형식의 데이터를 POST,PUT,DELETE 방식으로 fetch.
 * @param {string} url
 * @param {string} method
 * @param {Object} data
 * @returns 서버 반환 데이터가 포함된 Promise 객체를 반환한다.
 */
export function fetchByJson(url, method = "POST", data) {
  return handleRequest(
    url,
    buildOptions(method, { "Content-type": "application/json" }, JSON.stringify(data))
  );
}

/**
 * 서버로 Form형식의 데이터를 POST,PUT,DELETE 방식으로 fetch.
 * @param {string} url  - API url 전달.
 * @param {string} method default "POST"
 * @param {Object} data - FormData() 객체를 전달. new FormData(Form)를 전달
 * @returns 서버 반환 데이터가 포함된 Promise 객체를 반환한다.
 */
export function fetchByForm(url, method = "POST", data) {
  if (data instanceof Element || data instanceof Document) {
    data = new FormData(data);
  }
  return handleRequest(url, buildOptions(method, {}, data));
}

/**
 * 백엔드 서버 URL을 추가하고 response를 핸들한다.
 * @param {string} url
 * @param {object} options
 * @returns promise
 */
function handleRequest(url, options) {
  // Logging
  console.log(url);
  return handleResponse(fetch(SERVER_URL + url, options));
}

/**
 * fetch함수의 결과를 매개인자로 넘긴다.
 * 내부적으로 401,403등 status code를 캐치하여 페이지로 전환을 수행한다.
 * @param {Promise} promise
 * @returns 성공적인 결과는 JSON형식으로 반환.
 */
function handleResponse(promise) {
  return promise.then((response) => {
    if (response.status === 401 || response.status === 403) {
      return redirect("/user/login");
    } else if (response.status === 404) {
      console.log("NOT FOUND!");
      return null;
    } else {
      const result = response.json();
      result.status = response.status;
      return result;
    }
  });
}

/**
 * fetch의 option객체를 생성한다.
 * JWT가 존재하면 일괄적으로 요청에 JWT를 추가한다.
 * @param {string} method
 * @param {object} headers
 * @param {object} body
 * @returns 완성된 fetch option 객체를 반환한다.
 */
function buildOptions(method, headers = {}, body = undefined) {
  const jwt = localStorage.getItem("token");
  const options = {
    method: method,
    headers: headers,
    body: body,
  };
  if (jwt) {
    options.headers["Authorization"] = "Bearer " + jwt;
  }
  return options;
}
