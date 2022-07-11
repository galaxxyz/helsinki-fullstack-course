const MAX_LENGTH = 40;

export const shortenString = (string) => {
  return string.length > MAX_LENGTH
    ? `${string.slice(0, MAX_LENGTH)}...`
    : string;
};
