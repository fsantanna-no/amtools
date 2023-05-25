const Automerge = require('@automerge/automerge')

// MACHINE A

const A1 = Automerge.init()
const A2 = Automerge.change(A1, json => {
    json.list = []
})
const chgA1 = Automerge.getChanges(A1,A2)
const A3 = Automerge.change(A2, json => {
    json.list = ['a1']
})
const chgA2 = Automerge.getChanges(A2,A3)

// MACHINE B

const B1 = Automerge.init()
const [B2] = Automerge.applyChanges(B1, chgA1)
console.log(Automerge.getConflicts(B2))
const B3 = Automerge.change(B2, json => {
    json.list = ['b1']
})
console.log(Automerge.getConflicts(B3))
const chgB1 = Automerge.getChanges(B2,B3)

// SYNCHRONZIE A <-> B

const [A4] = Automerge.applyChanges(A3, chgB1)
const [B4] = Automerge.applyChanges(B3, chgA2)

console.log(A4)
console.log(B4)
console.log(Automerge.getConflicts(B4,'list'))
console.log(Automerge.getConflicts(A4,'list'))
