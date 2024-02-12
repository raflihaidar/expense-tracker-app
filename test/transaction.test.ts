import { beforeEach, describe, test, expect, vi  } from 'vitest'
import {useTransactionStore} from "../src/stores/transaction"
import { setActivePinia, createPinia } from 'pinia'

vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: [{ id : "1", transaction_name : "Jajan" }] }))
}))


describe("Test action in transaction store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('should first', async () => { 
    const store = useTransactionStore()
    await store.getData()
    expect(store.transactionList.value).toEqual([{ id : "1", transaction_name : "Jajan" }])
  })
})