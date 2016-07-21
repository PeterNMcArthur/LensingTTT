'use strict'

const expect = require('chai').expect
const R = require('ramda')

let name = R.lensProp('name') // user.name
let pet = R.lensProp('pet') // user.pet
let billingAddress = R.lensPath(['address', 'billing']) // user.address.billing

let user = {
    name: "Phteven",
    pet: {
        name: "Nipper",
        type: "dog"
    },
    address: {
        billing: {
            name: "Home",
            number: 12,
            line1: "Rowan Place",
            country: "Colchester",
            city: "Essex",
            postcode: "CO1 1AJ"
        }
    }
}

describe('Phteven Top Tips', () => {

    describe('R.view', () => {

        it('should view the users name', () => {
            let result = R.view(name, user)
            let output = "Phteven"
            expect(result).to.eql(output)
        })

        it('should view the billing address', () => {
            let result = R.view(billingAddress, user)
            let output = {
                name: "Home",
                number: 12,
                line1: "Rowan Place",
                country: "Colchester",
                city: "Essex",
                postcode: "CO1 1AJ"
            }
            expect(result).to.eql(output)
        })

        it('should view the pet', () => {
            let result = R.view(pet, user) 
            let output = {
                name: "Nipper",
                type: "dog"
            }
            expect(result).to.eql(output)
        })

        it('should view the billing address name', () => {
            let billingAddressName = R.compose(billingAddress, name)
            let result = R.view(billingAddressName, user) 

            let output = "Home"
            expect(result).to.eql(output)
        })

        it('should view the pet name', () => {
            let petName = R.compose(pet, name)
            let result = R.view(petName, user) 
            let output = "Nipper"
            expect(result).to.eql(output)
        })
    })

    describe('R.set', () => {
        it('should set a new name and return the whole user', () => {

            let newName = 'David Dronsfield'
            let result = R.set(name, newName, user)
            let output = {
                name: "David Dronsfield",
                pet: {
                    name: "Nipper",
                    type: "dog"
                },
                address: {
                    billing: {
                        name: "Home",
                        number: 12,
                        line1: "Rowan Place",
                        country: "Colchester",
                        city: "Essex",
                        postcode: "CO1 1AJ"
                    }
                }
            }

            expect(result).to.eql(output)
        })

        it('should set a new address name and return the whole user', () => {

            let newName = 'Work Address'
            let addressName = R.compose(billingAddress, name)
            let result = R.set(addressName, newName, user) 
            let output = {
                name: "Phteven",
                pet: {
                    name: "Nipper",
                    type: "dog"
                },
                address: {
                    billing: {
                        name: "Work Address",
                        number: 12,
                        line1: "Rowan Place",
                        country: "Colchester",
                        city: "Essex",
                        postcode: "CO1 1AJ"
                    }
                }
            }

            expect(result).to.eql(output)
        })

        it('should set a new pet name and return the whole user', () => {

            let newName = 'Poppy'
            let petName = R.compose(pet, name)
            let result = R.set(petName, newName, user) 
            let output = {
                name: "Phteven",
                pet: {
                    name: "Poppy",
                    type: "dog"
                },
                address: {
                    billing: {
                        name: "Home",
                        number: 12,
                        line1: "Rowan Place",
                        country: "Colchester",
                        city: "Essex",
                        postcode: "CO1 1AJ"
                    }
                }
            }

            expect(result).to.eql(output)
        })
    })

    describe('R.over', () => {

        it('should uppercase the name and return the whole user', () => {

            let result = R.over(name, R.toUpper, user)
            let output = {
                name: "PHTEVEN",
                pet: {
                    name: "Nipper",
                    type: "dog"
                },
                address: {
                    billing: {
                        name: "Home",
                        number: 12,
                        line1: "Rowan Place",
                        country: "Colchester",
                        city: "Essex",
                        postcode: "CO1 1AJ"
                    }
                }
            }

            expect(result).to.eql(output)
        })

        it('should uppercase the billing address name and return the whole user', () => {

            let billingAddressName = R.compose(billingAddress, name)
            let result = R.over(billingAddressName, R.toUpper, user)
            let output = {
                name: "Phteven",
                pet: {
                    name: "Nipper",
                    type: "dog"
                },
                address: {
                    billing: {
                        name: "HOME",
                        number: 12,
                        line1: "Rowan Place",
                        country: "Colchester",
                        city: "Essex",
                        postcode: "CO1 1AJ"
                    }
                }
            }

            expect(result).to.eql(output)
        })

        it('should reverse the pet name and return the whole user', () => {

            let petName = R.compose(pet, name)
            let result = R.over(petName, R.reverse, user)
            let output = {
                name: "Phteven",
                pet: {
                    name: "reppiN",
                    type: "dog"
                },
                address: {
                    billing: {
                        name: "Home",
                        number: 12,
                        line1: "Rowan Place",
                        country: "Colchester",
                        city: "Essex",
                        postcode: "CO1 1AJ"
                    }
                }
            }

            expect(result).to.eql(output)
        })
    })

})