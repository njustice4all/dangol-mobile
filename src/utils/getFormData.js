export default data => {
  const result = [];
  const recursive = (data, parentKey) => {
    const keys = Object.keys(data);
    keys.forEach(key => {
      if (typeof data[key] === 'object') {
        recursive(data[key], key);
        return;
      }

      if (parentKey) {
        result.push(`${parentKey}[${key}]=${data[key]}`);
        return;
      }
      result.push(`${key}=${data[key]}`);
    });
  };

  recursive(data);

  return result.join('&');
};
