export default function confirmedParticipants (registrationList) {
  let count = 0
    for (let i = 0; i < registrationList.length; i++) {
      if(registrationList[i].status === "confirmed"){
        count += 1;
      }
    }
    return count
}