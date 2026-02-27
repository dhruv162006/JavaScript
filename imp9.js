Function.prototype.myAdvancedBind = function (context, ...presetArgs) {
    const fn = this;

    function boundFunction(...laterArgs) {
        const isNew = this instanceof boundFunction;
        const finalContext = isNew ? this : context;
        return fn.apply(finalContext, [...presetArgs, ...laterArgs]);
    }

    boundFunction.prototype = Object.create(fn.prototype);
    return boundFunction;
};

function Person(name) {
    this.name = name;
}

Person.prototype.say = function () {
    return `Hi I am ${this.name}`;
};

const BoundPerson = Person.myAdvancedBind(null);
const p = new BoundPerson("Dhruv");

console.log(p.say());