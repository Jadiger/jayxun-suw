import style from './language-button.module.css'

import { useState } from 'react'
import RusIcon from '/public/Rus.svg'
import { ILanguage } from '@/auth/types/language'
export function LanguageButton() {
  const [selectLanguage, setSelectLanguage] = useState<string>('ru')

  const languages: ILanguage[] = [
    { code: 'ru', name: 'Русский', flag: RusIcon },
    { code: 'kk', name: 'Qaraqalpaqsha', flag: RusIcon },
  ]
  return (
    <div className={style.languageLists}>
      {languages.map((language) => (
        <label
          key={language.code}
          className={`${style.languageItem} ${
            language.code === selectLanguage ? style.activeLanguage : ''
          }`}
        >
          <span className={style.languageName}>
            <img src={language.flag} />
            {language.name}
          </span>
          <input
            type="radio"
            name="language"
            value={language.code}
            checked={selectLanguage === language.code}
            onChange={() => {
              setSelectLanguage(language.code)
            }}
          />
        </label>
      ))}
    </div>
  )
}
