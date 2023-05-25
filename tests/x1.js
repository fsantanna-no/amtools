const Automerge = require('@automerge/automerge')

const a1 = Automerge.init()
const a2 = Automerge.change(a1, doc => {
    doc.list = []
})

const b1 = Automerge.merge(Automerge.init(), a2)

const a3 = Automerge.change(a2, doc => {
    doc.list.push(1,2)
})

const b2 = Automerge.change(b1, doc => {
    doc.list.push(-1,-2)
})

const x1 = Automerge.merge(a3, b2)
console.log(x1)

const i1 = Automerge.getConflicts(x1, 'list')
console.log(i1)

/*
Automerge.getHistory(doc4).map(state => console.log([state.change.message, state.snapshot.cards.length]))

let doc = Automerge.init()
let actorId = Automerge.getActorId(doc)
console.log(actorId)
*/
