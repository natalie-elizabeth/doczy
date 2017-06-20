import request from 'superagent';

export const getEndpoint = ((endpoint) => {
  const url = endpoint;
  return (
    request
      .get(url)
  );
});


export const postEndpoint = ((endpoint) => {
  const url = endpoint;
  return (
    request
      .post(url)
  );
});

export const updateEndpoint = ((endpoint) => {
  const url = endpoint;
  return (
    request
      .update(url)
  );
});

export const deleteEndpoint = ((endpoint) => {
  const url = endpoint;
  return (
    request
      .delete(url)
  );
});
