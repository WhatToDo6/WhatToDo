export const formatDate = (date: string | Date): string => {
  const parsedDate = new Date(date)
  const formattedDate = parsedDate.toISOString().slice(0, 10)
  const formattedTime = parsedDate.toTimeString().slice(0, 5)
  return `${formattedDate} ${formattedTime}`
}
