import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');// Зашёл на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');//Проверяю цвет конпки и восс.пароль
          });
 afterEach('Конец теста', function () {     
            cy.get(result_page.close).should('be.visible');//Есть крестик,и он ввиден для пользователя
           });

          it('Верный логин и верный пароль', function () {
            cy.get(main_page.email).type(data.login);// Ввёл верный логин
            cy.get(main_page.password).type(data.password);// Ввёл верный пароль
            cy.get(main_page.login_button).click();// Нажал "войти"
            cy.get(result_page.title).should('be.visible');// Текст виден пользователю
            cy.get(result_page.title).contains('Авторизация прошла успешно');// Проверяю,что после авторизации виден текст
    
        })    

it('Восстановление пароля', function () {
    cy.get(main_page.fogot_pass_btn).click();// Нажимаю "восстановить пароль"
    cy.get(recovery_password_page.email).type(data.login);// Ввёл почту для восстановления
    cy.get(recovery_password_page.send_button).click();//Нажал "отправить код"
    cy.get(result_page.title).should('be.visible');// Текст виден пользователю
    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail')//Проверяю,что после авторизации виден текст
})
it('Верный логин и неверный пароль', function () {
    cy.get(main_page.email).type(data.login);// Ввёл верный логин
    cy.get(main_page.password).type('iLoveqastudio12');// Ввёл неверный  пароль
    cy.get(main_page.login_button).click();// Нажал "войти"
    cy.get(result_page.title).should('be.visible');// Текст виден пользователю
    cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверяю,что после авторизации виден текст
    cy.get(result_page.close).should('be.visible');// Текст виден пользователю
})
it('Неверный логин и верный пароль', function () {
    cy.get(main_page.email).type('germen@dolnikov.ru');// Ввёл неверный логин
    cy.get(main_page.password).type(data.password);// Ввёл верный пароль
    cy.get(main_page.login_button).click();// Нажал "войти"
    cy.get(result_page.title).should('be.visible');// Текст виден пользователю
    cy.get(result_page.title).contains('Такого логина или пароля нет');//Проверяю,что после авторизации виден текст
})


it('Валидация на наличие @', function () {
    cy.get(main_page.email).type("germandolnikov.ru");// Ввёл логие без @
    cy.get(main_page.password).type(data.password);// Ввёл верный пароль
    cy.get(main_page.login_button).click();// Нажал "войти"
    cy.get(result_page.title).should('be.visible');// Текст виден пользователю
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');//Проверяю,что после авторизации виден текст
    cy.get(result_page.close).should('be.visible');// Текст виден пользователю
})


it('Приведение к строчным буквам в логине', function () {
    cy.get(main_page.email).type('GerMan@Dolnikov.ru');// Ввёл неверный логин
    cy.get(main_page.password).type(data.password);// Ввёл верный пароль 
    cy.get(main_page.login_button).click();// Нажал "войти"
    cy.get(result_page.title).should('be.visible');// Текст виден пользователю
    cy.get(result_page.title).contains('Авторизация прошла успешно');//Проверяю,что после авторизации виден текст
})
})
//запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome