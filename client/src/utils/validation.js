export default function formValidate (data) {
    let keys = Object.keys(data)

    const email_regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    const phone_regex = /(^1300\d{6}$)|(^1800|1900|1902\d{6}$)|(^0[2|3|7|8]{1}[0-9]{8}$)|(^13\d{4}$)|(^04\d{2,3}\d{6}$)/
    const password_regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/
    const allowImageSize = 500000
    const dob_regex = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/

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
                case "password":
                    data[key] = true
                    break
                case "nickname":
                    data[key] = true
                    break
                case "gender":
                    data[key] = true
                    break
                case "dob":
                    data[key] = dob_regex.test(value)
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