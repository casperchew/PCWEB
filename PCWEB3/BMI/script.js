function calcBMI() {
    let weight = document.querySelector('#weight').value
    let height = document.querySelector('#height').value
    let BMI = weight / height ** 2
    alert(`Your BMI is ${BMI}`)
    document.querySelector('p').textContent = `Your BMI is ${BMI}`
}