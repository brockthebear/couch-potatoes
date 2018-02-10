export const defaultTitle = "Couch Potatoes ❤️";

export const getTitle = title => {
  return title ? `${title} - Couch Potatoes` : defaultTitle;
};
