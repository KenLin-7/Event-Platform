export default function humanDateConvert (dateString) {
  if(dateString === null){
    return "Pending..."
  }
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric" }
  const convertedDate = new Date(dateString).toLocaleDateString(undefined, options)
  return convertedDate

}