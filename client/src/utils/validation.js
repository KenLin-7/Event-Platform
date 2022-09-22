export default function formValidate (data) {
    let keys = Object.keys(data)
    const email_regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    const phone_regex = ""
    const password_regex = ""
    keys.forEach(key => {
        const value = data[key]
        if(value !== ""){
            // regex validation 
            switch(key) {
                case "email":
                    data[key] = email_regex.test(value)
                    break
                // case "password":
                //      data[key] = password_regex.test(value)
                //      break
                // case "phone":
                //      data[key] = phone_regex.test(value)
                //      break
                default: 
                    data[key] = true
            }
        }else{
            data[key] = false
        }
    });
    return data
}