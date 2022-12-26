import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithOutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)

  return (diary !== undefined) ? res.send(diary) : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    res.json(newDiaryEntry)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message)
    }
  }
})

export default router
