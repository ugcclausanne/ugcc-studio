import React from 'react'
import {TextInput} from '@sanity/ui'
import {set, unset} from 'sanity'

export default function TimeInput(props) {
  const {value, onChange} = props
  const handleChange = (e) => {
    const v = e.target.value
    if (!v) onChange(unset())
    else onChange(set(v))
  }
  return (
    <TextInput type="time" step={60} value={value || ''} onChange={handleChange} />
  )
}
