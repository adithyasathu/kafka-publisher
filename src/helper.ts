import * as faker from "faker";
import * as moment from "moment";
import {Constants, Customer, Product} from "./types";

const fakeDateBetween = (past: number, latest: number): string => {
    let recent: string = moment().subtract(moment.duration(latest, 'y')).format(Constants.DATEFORMAT);
    let date = faker.date.past(past, recent);
    return moment(date).format(Constants.DATEFORMAT);
};

export const fakeTransactionTime = (days: number): number => {
    return moment(faker.date.recent(days)).valueOf();
};

export const fakeCustomer = (): Customer => {

    // make name contextual to username and email
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return {
        name:  faker.name.findName(firstName, lastName),
        dob: fakeDateBetween(70, 20), // between past 20 - 70 years
        streetAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        postCode: faker.address.zipCode(),
        country: faker.address.country(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(firstName, lastName),
    }

};

const products: Product [] = [
    { name: "Lego Mindstorms", description: "Lego puzzles for kids mind", price: 30.80 },
    { name: "Digital pet", description: "Why not have digital pet ?", price: 40.50 },
    { name: "Robo Dog",description: "Love dogs? Love Robot? we have a Robo Dog", price: 439.80 },
    { name : "Newton's cradle", description: "0-6 months cradle with brain", price: 575 },
    { name: "Easy-Bake Oven", description: "Let the machine do the baking", price: 899 },
    { name: "Bot Drone", description: "Hi-Tech Drone with auto pilot mode", price: 456.30 },
    { name: "i-Robo", description: "Robot like never before", price: 980 },
    { name: "Surveillance Monkey", description: "Keep your home safe", price: 3400 },
    { name: "Sumo Bot", description: "Customisable & Programmable Bot", price: 670 },
    { name : "Wifi Remote", description: "Lets keep all the appliances connected to wifi under button click", price: 2100 },
];

export const fakeProduct = (selection?: number): Product => {

    const product = (selection) ? products[selection] : products[Math.floor(Math.random() * products.length)]; // randomly pic one product

    return product;
};
