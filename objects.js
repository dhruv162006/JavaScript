let student = {
  name: "Dhruv",
  age: 20,
  course: "BTech CSE",
  marks: {
    math: 85,
    physics: 90
  },
  greet() {
    return "Hello, my name is " + this.name;
  }
};

console.log(student.name);
console.log(student["age"]);
console.log(student.marks.math);

student.city = "Dehradun";
student.age = 21;

delete student.course;

console.log(student.greet());

for (let key in student) {
  console.log(key, student[key]);
}

let copyStudent = { ...student };

copyStudent.name = "Rahul";

console.log(student.name);
console.log(copyStudent.name);
