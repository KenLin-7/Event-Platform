export default function formValidate (data) {
    let keys = Object.keys(data)

    const email_regex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
    const phone_regex = ""
    const password_regex = ""
    const allowImageSize = 500000

    keys.forEach(key => {
        const value = data[key]
        if(value !== "" || value === null){
            // regex validation 
            switch(key) {
                case "email":
                    data[key] = email_regex.test(value)
                    break
                // case "phone":
                //     data[key] = value > 0 && value < 10
                default: 
                    data[key] = true
            }
        }else{
            data[key] = false
        }
    });
    
    return data
}