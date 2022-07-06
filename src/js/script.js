// // //Напишите ф-цию calcTotalPrice(stones, stonesName),
// // //которая принимает массив объектов и
// // //строку с названием камня.
// // //Функция считает м возвращает общую стоимость камней
// // //с таким именем, ценой и количеством из объекта

// // const stones = [
// //   { name: "Изумруд", price: 1300, quantity: 4 },
// //   { name: "Бриллиант", price: 2700, quantity: 6 },
// //   { name: "Сапфир", price: 400, quantity: 7 },
// //   { name: "Щебень", price: 150, quantity: 100 },
// // ];

// // function calcTotalPrice(stones, stonesName) {
// //   for (const { name, price, quantity } of stones) {
// //     if (name === stonesName) {
// //       return `total sum of ${stonesName}: ${
// //         price * quantity
// //       } (price - ${price}, quantity - ${quantity})`;
// //     }
// //   }
// //   return `${stonesName} is not exist`;
// // }

// // console.log(calcTotalPrice(stones, "Бриллиант"));
// // console.log(calcTotalPrice(stones, "Diamond"));

// //5.1 Напишите функцию updateObject, которая принимает объект и возвращает
// //новый объект без указанных параметров
// //Ожидаемый результат ({a: 1, b: 2, c: 3}, 'b', 'a') => {c: 3}

// // function updateObject(obj, ...properties) {
// //   const newObject={...obj};
// //   for (const prop of properties) {
// //     if (obj.hasOwnProperty(prop)) delete newObject[prop];
// //   }
// //   return newObject;
// // }

// // console.log(updateObject({a: 1, b: 2, c: 3}, 'b', 'a'));

// //Напиши скрипт управления личным кабинетом интернет банка
// //Есть объект account в котором необходимо реализовать
// //методы для работы с балансом и историей транзакций

// //Типов транзакций всего два.
// //Можно положить либо снять деньги со счета
// const Transaction = {
//   DEPOSIT: "deposit",
//   WITHDRAW: "withdraw",
// };

// //Каждая транзакция это объект со свойствами id, type, amount

// const account = {
//   //текущий баланс счёта
//   balance: 0,

//   //История транзакций
//   transactions: [],

//   //Метод создает и возвращает объект транзакций
//   //Принимает сумму и тип транзакций
//   createTransaction(type, amount) {
//     const id = Date.now();
//     return { id, type, amount };
//   },

//   //Метод отвечающий за добавление суммы к балансу.
//   //Принимает сумму транцакции.
//   //Вызывает createTransaction для создания объекта транзакции
//   //после чего добавляет его в историю транзакций
//   deposit(amount) {
//     this.balance += amount;
//     this.transactions.push(this.createTransaction(Transaction.DEPOSIT, amount));
//   },

//   //Метод отвечающий за снятие суммы с баланса.
//   //Принимает сумму транцакции.
//   //Вызывает createTransaction для создания объекта транзакции
//   //после чего добавляет его в историю транзакций
//   //Если amount больше чем текущий баланс, выводим сообщение о том,
//   //что недостаточно средств на счету
//   withdraw(amount) {
//     if (amount > this.balance) return `Недостатньо коштів на рахунку!`;
//     this.balance -= amount;
//     this.transactions.push(
//       this.createTransaction(Transaction.WITHDRAW, amount)
//     );
//     return `Видано ${amount}. Залишок коштів ${this.balance}`;
//   },

//   //Метод возвращает текущий баланс
//   getBalance() {
//     return this.balance;
//   },

//   //Метод ищет и возвращает объект транзакции по id
//   getTransactionDetails(id) {
//     for (const transaction of this.transactions) {
//       if (transaction.id === id) return transaction;
//     }

//     return `Транзакції ${id} не знайдено`;
//   },

//   //Метод возвращает количество средств определенного типа
//   //транзакции из всей истории транзакций
//   getTransactionType(type) {
//     return `Знайдено операцій типу ${type} на суму ${this.transactions
//       .filter((transaction) => transaction.type === type)
//       .reduce((acc, transaction) => acc + transaction.amount, 0)}`;
//   },
// };

// Напишите две функции
//makeProduct(name, price, callback) - принимает
//имя и цену товара, а так же callback.
//Функция создает объект товара, добавляя ему уникальный
//идентификатор в свойство id и вызывает callback
//передавая ему созданный объект.
//showProduct(product) - коллбек принимающий объект
//продукта и логирующий его в консоль

// function makeProduct(name, price, showProduct) {
//   return showProduct({
//     id: Date.now(),
//     name,
//     price,
//   });
// }

// const showProduct = (product) => product;

// console.table(makeProduct("Fish", 350, showProduct));

//1. Создать маркированный список.
//Создать кнопки "Add" "Remove", которые будут менять состав списка
//Создать input с которого будем получать значение, которое будет в li
//* Четным li указать красный фон, нечетным -- синим
//Для выполнения задания используйте createElement

// const listRef = document.createElement("ul");
// const inputRef = document.createElement("input");

// const addItemBtn = document.createElement("button");
// addItemBtn.textContent = "Add Item";
// addItemBtn.classList = "btn-add";

// const removeItemBtn = document.createElement("button");
// removeItemBtn.textContent = "Remove Item";
// removeItemBtn.classList = "btn-remove";

// document.body.append(inputRef, addItemBtn, removeItemBtn, listRef);

// addItemBtn.addEventListener("click", onAddItemBtnClick);

// removeItemBtn.addEventListener("click", onRemoveItemBtnClick);

// function onAddItemBtnClick() {
//   const listItemRef = document.createElement("li");
//   listItemRef.textContent = inputRef.value || "Ніого не введено";
//   listRef.append(listItemRef);
//   inputRef.value = "";
//   listItemRef.classList = listRef.children.length % 2 === 0 ? "odd" : "even";
// }

// function onRemoveItemBtnClick() {
//   if (listRef.children.length) listRef.removeChild(listRef.lastChild);
// }

// Создать форму авторизации.
//В форме авторизации, пользователь должен ввести
//логин и пароль для входа в систему.
// - кнопка "Отправить" становится активной только в том случае
//когда заполнены оба поля и пользователь отметил чекбокс
// - поле логина должно содержать значение минимум 4 символа
// - поле пароля от 3 до 30 символов
// - если условия не соответствуют требованиям то
//при потере фокуса поле ввода показывает ошибку
// - после нажатия кнопки "Отправить" надо вывести сообщение
//об успешной авторизации

// const feedBackFormRef = document.querySelector(".js-feedback-form");
// console.log(feedBackFormRef.elements);
// const userLoginRef = feedBackFormRef.elements.login;
// const userLoginInfoRef = document.querySelector("#loginInfo");

// feedBackFormRef.elements.login.addEventListener("focus", () => {
//   userLoginInfoRef.style.display = "block";
// });
// feedBackFormRef.elements.login.addEventListener("blur", (e) => {
//   if (e.target.value.length < 4) {
//     e.target.classList.add("error");
//   } else {
//     if (e.target.classList.contains("error")) {
//       e.target.classList.remove("error");
//     }
//     userLoginInfoRef.style.display = "none";
//   }

// });

// const userPasswordRef = document.querySelector("#password ");
// const userPasswordRefInfoRef = document.querySelector("#passwordInfo");

// userPasswordRef.addEventListener("focus", () => {
//   userPasswordRefInfoRef.style.display = "block";
// });
// userPasswordRef.addEventListener("blur", () => {
//   userPasswordRefInfoRef.style.display = "none";
// });
