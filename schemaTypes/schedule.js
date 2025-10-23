import TimeInput from '../components/TimeInput'
export default {
  name: 'schedule',
  title: 'Розклад',
  type: 'document',
  fields: [
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', validation: (r) => r.required()},
    {name: 'date', title: 'Дата', type: 'date'},
    {name: 'time', title: 'Час', type: 'string', components: {input: TimeInput}, validation: r => r.required().regex(/^([01]\\d|2[0-3]):[0-5]\\d$/, {name: 'HH:mm'}).error('Формат HH:mm, напр. 09:30')},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Liturgy', value: 'liturgy'},
        {title: 'Announcement', value: 'announcement'},
      ]},
    },
    {name: 'title', title: 'Заголовок', type: 'string', validation: (r) => r.required()},
    {name: 'details', title: 'Деталі', type: 'text'},
    {name: 'location', title: 'Локація', type: 'string'},
    {
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {list: [
        {title: 'Ukrainian', value: 'uk'},
        {title: 'English', value: 'en'},
        {title: 'French', value: 'fr'},
      ]},
      validation: (r) => r.required(),
    },
    {name: 'before_time', title: 'Перед: час', type: 'string', components: {input: TimeInput}, validation: r => r.regex(/^$|^([01]\\d|2[0-3]):[0-5]\\d$/, {name: 'HH:mm'})},
    {name: 'before_details', title: 'Перед: деталі', type: 'text'},
    {name: 'after_time', title: 'Після: час', type: 'string', components: {input: TimeInput}, validation: r => r.regex(/^$|^([01]\\d|2[0-3]):[0-5]\\d$/, {name: 'HH:mm'})},
    {name: 'after_details', title: 'Після: деталі', type: 'text'},
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}},
    {name: 'link', title: 'Посилання', type: 'url'},
    {name: 'auto_translated', title: 'Автопереклад', type: 'boolean'},
  ],
  preview: {
    select: {title: 'Заголовок', date: 'date', time: 'time', cat: 'category'},
    prepare: ({title, date, time, cat}) => ({
      title: `${cat || ''} ${date || ''} ${time || ''}`.trim(),
      subtitle: title,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Timestamp desc', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Timestamp asc', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}



