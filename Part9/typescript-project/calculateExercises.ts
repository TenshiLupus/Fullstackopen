interface trainingResult {
    days : number,
    trainedDays: number,
    target:number,
    average: number,
    reached: boolean,
    rating: number,
    ratingDescription: string
}

interface inputArguments {
    numbers: number[],
    target: number
}


const calculateExercise = (weekHours : number[], target: number) : trainingResult => {
    let rating: number = 0
    let ratingDescription: string = "placeholder"
    let average: number = 0
    let trainingsDays: number = 0
    
    for (let i = 0; i <= weekHours.length-1; i++){
        let trainedHours: number = weekHours[i]
        if(trainedHours === 0){
            continue
        }
        trainingsDays += 1
        average += trainedHours
    }

    average = average/weekHours.length

    console.log(average)
    switch(true) {
        case (average <= 0.5):
            ratingDescription = "bad";
            rating = 1
            break
        case (average < 2):
            ratingDescription = "Normal (acceptable)";
            rating = 2
            break
        case (average >= 2):
            ratingDescription = "Sustainable";
            rating = 3
            break
        default:
            throw new Error('Non-valid value counted');            
    }

    let reached = average >= target 

    const tR = {
        days: weekHours.length,
        trainedDays: trainingsDays,
        target,
        average,
        reached,
        rating,
        ratingDescription
    }
    return tR
}

const parseArguments = (arguments: string[]) : inputArguments => {
    
    let dayHoursArg : number[] = []
    let targetArg: number = 0

    for(let current = 2; current < arguments.length - 1; current++){
        dayHoursArg.push(Number(arguments[current]))
    }
    targetArg = Number(arguments[arguments.length-1])
    
    return ({
        numbers : dayHoursArg,
        target: targetArg
    })
}

const functionArgs : inputArguments = parseArguments(process.argv)

console.log(calculateExercise(functionArgs.numbers, functionArgs.target))