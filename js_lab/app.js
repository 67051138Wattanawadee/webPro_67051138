// Part1
//let can be changed, const (constant)
// let scoreInput = prompt("กรอกคะแนนสอบ")
// if(scoreInput<0 || scoreInput>100){
//     console.log("ข้อมูลไม่ถูกต้อง");
// }else if(scoreInput>50){
//     console.log("สอบผ่าน");
// }else if(scoreInput<50){
//     console.log("สอบไม่ผ่าน");
// }

//Part2
// let scores = [45, 78, 82, 35, 90];
// let index=0;
// console.log("Using While-loop");
// while(index<scores.length){
//     console.log("index: " + index + ", value: " + scores[index]);
//     index++;
// }

// console.log("Using For-loop");
// for(index=0; index<scores.length; index++){
//     console.log("index: " + index + ", value: " + scores[index])
// }

// console.log("Using .push()");
// scores.push(65, 48);
// console.log(scores);

// console.log("Using .pop()");
// lastValue = scores.pop(scores.length);
// console.log("คะแนนตัวสุดท้ายใน array: " + lastValue);

// console.log(scores.includes(82));
// console.log(!scores.includes(82));

// let sortedScores = scores.sort();
// console.log(sortedScores);


//Part2.2
//for-each
// let students = [
//     { id: 1, name: "Somchai", score: 48 },
//     { id: 2, name: "Somsri", score: 75 },
//     { id: 3, name: "Sompong", score: 32 },
//     { id: 4, name: "Somnak", score: 85 }
// ];
// students.forEach((student, indexSt) =>{
//     console.log(`index: ${indexSt}, name: ${student.name}, score: ${student.score}`);
// });

//.map()
// let doubledScore = students.map(student => {
//     return{
//         id: student.id,
//         name: student.name,
//         score: student.score *2
//     };
// })
// console.log(doubledScore);

//.filter()
// let scoreUpper50 = students.filter(student => student.score>50);
// console.log(scoreUpper50);

//.find()
// let findSomsri = students.find(student => student.name=="Somsri");
// console.log(findSomsri)


//Part3
//Function ปกติ 
// function calculateGrade(score){
//     if(score>=80){
//         return "ได้เกรด A";
//     }else if(score>= 60){
//         return "ได้เกรด B";
//     }else if(score<60){
//         return "ได้เกรด F";
//     }else{
//         return "Invalid Score"
//     }
// }
// console.log(calculateGrade(90));

//Arrow Function
// let calculateGradeverArrowFunc = (score) =>{
//     if(score>=80){
//         return "ได้เกรด A";
//     }else if(score>= 60){
//         return "ได้เกรด B";
//     }else if(score<60){
//         return "ได้เกรด F";
//     }else{
//         return "Invalid Score"
//     }
// };
// console.log(calculateGradeverArrowFunc(99));

//map() หรือ .forEach() ใน Object students จากข้อ 2.2
// let studentGrade = students.map(student =>{
//     return{
//         id: student.id,
//         name: student.name,
//         score: student.score,
//         grade: calculateGradeverArrowFunc(student.score)
//     };
// });
// console.log(studentGrade);


//Part3.2
let wantingDice = prompt("ต้องการทายลูกเต๋าเป็นเลขอะไร");
let numOfDice = Math.floor(Math.random() * 7);
if(wantingDice==numOfDice){
    console.log("ยินดีด้วย! คุณทายถูกต้อง เลขที่ออกคือ " + numOfDice);
}else{
    console.log("เสียใจด้วย! คุณทายผิด บอททอยลูกเต๋าได้เลข " + numOfDice);
}