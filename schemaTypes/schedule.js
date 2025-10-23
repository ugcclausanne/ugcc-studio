import TimeInput from '../components/TimeInput'
export default {
  name: 'schedule',
  title: 'Розклад',
  type: 'document',
  fields: [
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'date', title: 'Дата', type: 'date', validation: r => r.required()},
    {name: 'time', title: 'Час', type: 'string', components: {input: TimeInput}, validation: r => r.required()},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Літургія', value: 'liturgy'},
        {title: 'Оголошення', value: 'announcement'},
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
        {title: 'Українська', value: 'uk'},
        {title: 'English', value: 'en'},
        {title: 'Français', value: 'fr'},
      ]},
      validation: (r) => r.required(),
    },
    {name: 'before_time', title: 'Перед: час', type: 'string', components: {input: TimeInput}},
    {name: 'before_details', title: 'Перед: деталі', type: 'text'},
    {name: 'after_time', title: 'Після: час', type: 'string', components: {input: TimeInput}},
    {name: 'after_details', title: 'Після: деталі', type: 'text'},
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}},
    {name: 'link', title: 'Посилання', type: 'url'},
    {name: 'auto_translated', title: 'Автопереклад', type: 'boolean'},
  ],
  preview: {
    select: {title: 'title', date: 'date', time: 'time', cat: 'category'},
    prepare: ({title, date, time, cat}) => ({
      title: `${cat || ''} ${date || ''} ${time || ''}`.trim(),
      subtitle: title,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Час (спадно)', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Час (зрост.)', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}
