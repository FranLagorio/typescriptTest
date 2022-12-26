import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'

// Excepcion de tipo "as ....", siempre evitarlo, salvo cuando vienen json de terceros, es muy comun que pase
const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries
export const getEntriesWithOutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  if (entry !== undefined) {
    const { comment, ...restOfEntry } = entry
    return restOfEntry
  }
  return undefined
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: diaries.length,
    ...newDiaryEntry
  }

  diaries.push(newDiary)

  return newDiary
}
