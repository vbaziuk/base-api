# readme

### **Running Passbook Server:**
```sh
$ node server.js
```

### **Testing API with Postman**
when forming the body to test in postman, use 'Body > raw'. Using form-data spits a 415 code.
```json
{
    "name": "HackerMan",
    "email": "victor@ultimatehackerz.com",
    "password": "1notgoodpassword!"
}
```

### **Future potential features to be implemented**
**Password Generation**: A random password generator to create easier to remember passwords when you're drawing a blank. This will generate a secure password using upper and lowercase characters, a number, a special character to ensure password strength.

In an effort to create passwords that are memorable, adjectives will be paired with nouns. The goal is to create eccentric, random passwords that are memorable for the user.
```
example.

>> CrazyAutomobile1&

>> 78RainyBookshelf#
```