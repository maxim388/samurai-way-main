export const required = (value: string) => {
  return value ? undefined : "Field is required";
};

export const maxLengthCreator = (maxLength: number): Function => {
  return (value: string) => {
    if (value.length > maxLength) {
      return `Max length is ${maxLength} symbols`;
    } else {
      return undefined;
    }
  };
};
