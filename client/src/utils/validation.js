export default function formValidate (data) {
    let keys = Object.keys(data)

    const email_regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    const phone_regex = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/
    //const phone_regex = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/
    const password_regex = ""
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
                    //data[key] = phone_regex.test(value)
                    data[key] = true
                    break
                case "password":
                    //data[key] = password_regex.test(value)
                    data[key] = true
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