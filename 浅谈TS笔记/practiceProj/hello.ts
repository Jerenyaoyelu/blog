function sayHello(person: string) {
	return 'Hello, ' + person;
}

let user = 'Jeren';
console.log(sayHello(user));

interface IPerson {
	name: string;
	age?: number;
	[propName: string]: string | number;
	//定义了属性名称类型为string的任意属性
	//这里在赋值变量时候便可以复制多个任意属性
}

let jeren: IPerson = {
	name: 'Jeren',
	gender: 'male',
	hobby: 'reading',
};
