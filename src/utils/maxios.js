// Mock Axios function

function fn(settle, returnedValue, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (settle === 'fail') {
        reject({ code: 500, response: { data: returnedValue } });
      } else {
        resolve({ data: returnedValue });
      }
    }, delay);
  });
}

export const maxios = {
  get: fn,
  post: fn,
  put: fn,
  delete: fn,
};