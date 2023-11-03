
const calculateBmi = (height: number, weight: number) : String => {
    let bmi = weight / ((height/100) ** 2)

    switch(true) {
        case (bmi <= 18.5):
            return "Underweight";
        case (bmi <= 25):
            return "Normal (healthy weight)";
        case (bmi >= 30):
            return "Overweight";
        default:
            throw new Error('Non-valid value inserted');            
    }
}

console.log(calculateBmi(180, 74))