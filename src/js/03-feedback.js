import throttle from "lodash.throttle"

const form = document.querySelector('.feedback-form')
const email = document.querySelector('input[name="email"]')
const message = document.querySelector('textarea[name="message"]')
const localKey = 'feedback-form-state'

form.addEventListener('input', throttle(e => {
    const objectToSave = {
        email: email.value,
        message: message.value
    }

    localStorage.setItem(localKey, JSON.stringify(objectToSave))
}, 500))
form.addEventListener('submit', e => {
    e.preventDefault()
    if (email.value === '' || message.value === '') {
        return alert('Заповни всі поля')
    }
   console.log({
        email: email.value,
        message: message.value
    })
    form.reset() // очищує поля
    localStorage.removeItem(localKey) //очищує сховище
}) 

//метод який абстрагує повторюваний код перевірки помилок
const load = key => {
    try {
        const currentState = localStorage.getItem(key)
        return currentState === null ? undefined : JSON.parse(currentState)
    } catch (error) {
        console.error('Get state error: ', error.message)
}
}

const storageData = load(localKey)
if (storageData) {
    email.value = storageData.email
    message.value = storageData.message
}