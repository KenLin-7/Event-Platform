export default function formValidate (data) {
    let keys = Object.keys(data)
console.log(data)
    const email_regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    const phone_regex = ""
    const password_regex = ""
    const suburb_regex=/[A-Za-z]/
    const postcode_regex = /^[0-9]{4}$/

    const allowImageSize = 500000

// {
//     "nickname": "sdasdasd",
//     "phone":12213123
// }

// {
//     "nickanme":false,
//     "phone":true
// }
    keys.forEach(key => {
        const value = data[key]
        if(value !== "" || value === null){
            // regex validation 
            switch(key) {
                case "email":
                    data[key] = email_regex.test(value)
                    break
                case "phone":
                    data[key] = phone_regex.test(value)
                    break
                case "suburb":
                    data[key]= suburb_regex.test(value)
                        break
                case "postcode":
                    data[key]=postcode_regex.test(value)
                        break
                default:
                    data[key] = true
            }
        }else{
            data[key] = false
        }
    });
    
    return data
}