export function dateObjectToBackendDateFormat(dateTime: number) {
  const date = new Date(dateTime);

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
