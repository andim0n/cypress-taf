export const generateRandomInt = () => Math.floor(Math.random() * 4000 + 600);

export const generateRandomString = (length = 8) => Math.random().toString(20).substr(2, length);

export const generateRandomEmail = () => Math.random().toString(36).substr(2, 11).concat('@test.com');

export const compareResponseWithEntity = (entity, response) => {
  const objectMap = new Map(Object.entries(entity));

  objectMap.forEach((value, key) => {
    expect(response.body[key]).is.eq(value);
  });
};

export const generateCurrentTime = () => {
  return new Date().toISOString().match(/\d+/g).join('');
};

export const getPureNumberFromStr = (str) => str.replace(/\D/g, '');

export const generateRandomProductId = () => Math.random().toString().slice(2, 11);

export const generateCurrentDate = () => {
  return new Date().getDate();
};
