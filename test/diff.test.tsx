import React from '../src/kut'
import { KutElement } from '../src/element'
import { diff, patch } from '../src/diff'
import { DOMInstance } from '../src/instance'

describe('test/render.test.js', () => {
  function getListEleArr(list: number[]): KutElement[] {
    return list.map(i => <div key={i}>{i}</div>)
  }
  function getListInstArr(list: KutElement[]): DOMInstance[] {
    return list.map((ele, index) => {
      const inst = new DOMInstance(ele)
      inst.index = index
      return inst
    })
  }
  const oldList = getListEleArr([1, 2, 3, 4, 5])

  it('should diff out only one forward move patch', () => {
    const instList = getListInstArr(oldList)
    const inst = instList[0]
    const patches = diff(instList, getListEleArr([2, 3, 4, 5, 1]))

    expect(patches.dir).toBe('forward')
    expect(patches.ops.length).toBe(1)

    const patch = patches.ops[0]

    expect(patch.type).toBe('move')
    expect(patch.inst).toBe(inst)
    expect(patch.index).toBe(instList.length - 1)
  })

  it('should diff out only one backward move patch', () => {
    const instList = getListInstArr(oldList)
    const inst = instList[instList.length - 1]
    const patches = diff(instList, getListEleArr([5, 1, 2, 3, 4]))
    
    expect(patches.dir).toBe('backward')
    expect(patches.ops.length).toBe(1)

    const patch = patches.ops[0]

    expect(patch.type).toBe('move')
    expect(patch.inst).toBe(inst)
    expect(patch.index).toBe(0)
  })

  it('should diff out only one forward remove patch', () => {
    const instList = getListInstArr(oldList)
    const inst = instList[2]
    const patches = diff(instList, getListEleArr([1, 2, 4, 5]))
    
    expect(patches.dir).toBe('backward')
    expect(patches.ops.length).toBe(1)

    const patch = patches.ops[0]

    expect(patch.type).toBe('remove')
    expect(patch.inst).toBe(inst)
    expect(patch.index).toBeUndefined()
  })

  it('should diff out only one backward insert patch', () => {
    const instList = getListInstArr(oldList)
    const patches = diff(instList, getListEleArr([1, 2, 3, 4, 5, 6]))

    expect(patches.dir).toBe('backward')
    expect(patches.ops.length).toBe(1)

    const patch = patches.ops[0]

    expect(patch.type).toBe('insert')
    expect(patch.inst.key).toBe('k_6')
    expect(patch.index).toBe(5)
  })

  it('should diff and forward patch normally', () => {
    const instList = getListInstArr(oldList)
    let markup = ''
    instList.forEach(inst => {
      markup += inst.mount('kut:' + inst.key)
    })
    document.body.dataset.kutid = 'kut'
    document.body.innerHTML = markup
    const patches = diff(instList, getListEleArr([3, 2, 4, 5, 1, 6]))

    expect(patches.dir).toBe('forward')
    expect(patches.ops.length).toBe(3)
    expect(patches.ops[0].type).toBe('move')
    expect(patches.ops[0].inst.key).toBe('k_2')
    expect(patches.ops[0].index).toBe(2)
    expect(patches.ops[1].type).toBe('move')
    expect(patches.ops[1].inst.key).toBe('k_1')
    expect(patches.ops[1].index).toBe(4)
    expect(patches.ops[2].type).toBe('insert')
    expect(patches.ops[2].inst.key).toBe('k_6')
    expect(patches.ops[2].index).toBe(4)

    patch('kut', patches)
    const childNodes = document.body.childNodes

    expect(childNodes.length).toBe(6)
    expect((childNodes[0] as any).dataset.kutid).toBe('kut:k_3')
    expect((childNodes[1] as any).dataset.kutid).toBe('kut:k_2')
    expect((childNodes[2] as any).dataset.kutid).toBe('kut:k_4')
    expect((childNodes[3] as any).dataset.kutid).toBe('kut:k_5')
    expect((childNodes[4] as any).dataset.kutid).toBe('kut:k_1')
    expect((childNodes[5] as any).dataset.kutid).toBe('kut:k_6')

    delete document.body.dataset.kutid
    document.body.innerHTML = null
  })

  it('should diff and backward patch normally', () => {
    const instList = getListInstArr(oldList)
    let markup = ''
    instList.forEach(inst => {
      markup += inst.mount('kut:' + inst.key)
    })
    document.body.dataset.kutid = 'kut'
    document.body.innerHTML = markup
    const patches = diff(instList, getListEleArr([5, 1, 2, 3]))

    expect(patches.dir).toBe('backward')
    expect(patches.ops.length).toBe(2)
    expect(patches.ops[0].type).toBe('move')
    expect(patches.ops[0].inst.key).toBe('k_5')
    expect(patches.ops[0].index).toBe(0)
    expect(patches.ops[1].type).toBe('remove')
    expect(patches.ops[1].inst.key).toBe('k_4')
    expect(patches.ops[1].index).toBeUndefined()

    patch('kut', patches)
    const childNodes = document.body.childNodes

    expect(childNodes.length).toBe(4)
    expect((childNodes[0] as any).dataset.kutid).toBe('kut:k_5')
    expect((childNodes[1] as any).dataset.kutid).toBe('kut:k_1')
    expect((childNodes[2] as any).dataset.kutid).toBe('kut:k_2')
    expect((childNodes[3] as any).dataset.kutid).toBe('kut:k_3')

    delete document.body.dataset.kutid
    document.body.innerHTML = null
  })
})