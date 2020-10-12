import 'colors';

const urlIsValidEntry = (entry: string) => {
  let url: URL | null = null;

  try {
    url = new URL(entry);
  } catch (e) {}

  return !!url;
};

export default urlIsValidEntry;
