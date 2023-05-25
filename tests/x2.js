const Automerge = require('@automerge/automerge')

// MACHINE A

const A1 = Automerge.init()
const A2 = Automerge.change(A1, json => {
    json.list = []
})
const chgA1 = Automerge.getChanges(A1,A2)
const A3 = Automerge.change(A2, json => {
    json.list.push('a1','a2')
})
const chgA2 = Automerge.getChanges(A2,A3)

// MACHINE B

const B1 = Automerge.init()
const [B2] = Automerge.applyChanges(B1, chgA1)
console.log(B2)
const B3 = Automerge.change(B2, json => {
    json.list.push('b1','b2')
})
const chgB1 = Automerge.getChanges(A2,A3)

// SYNCHRONZIE A <-> B

const A4 = Automerge.applyChanges(A3, chgB1)
const B4 = Automerge.applyChanges(B3, chgA2)

console.log(A4)
console.log(B4)
