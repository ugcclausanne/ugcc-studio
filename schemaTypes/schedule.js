import TimeInput from '../components/TimeInput'
export default {
  name: 'schedule',
  title: 'Розклад',
  type: 'document',
  fields: [
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'date', title: 'Дата', type: 'date', description: 'Дата події (виберіть у календарі або введіть вручну).', validation: (r) => r.required(), initialValue: '$today'},
    {name: 'time', title: 'Час', type: 'string', components: {input: TimeInput}, description: 'Час події у форматі HH:mm. Необов’язково.', validation: (r) => r.required(), initialValue: '$time'},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Літургія', value: 'liturgy'},
        {title: 'Оголошення', value: 'announcement'},
      ]},
      description: 'Категорія події для відображення на сайті.',
    },
    {name: 'title', title: 'Заголовок', type: 'string', validation: (r) => r.required(), description: 'Коротка назва події.'},
    {name: 'details', title: 'Деталі', type: 'text', description: 'Додаткова інформація (за потреби).'},
    {name: 'location', title: 'Місце', type: 'string', description: 'Наприклад: адреса або назва локації.'},
    {
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {list: [
        {title: 'Українська', value: 'uk'},
        {title: 'Français', value: 'fr'},
      ]},
      description: 'Мова публікації (укр або фр).',
      validation: (r) => r.required(),
    },
    {name: 'before_time', title: 'Перед: час', type: 'string', components: {input: TimeInput}, description: 'Час підготовки (за потреби).'},
    {name: 'before_details', title: 'Перед: деталі', type: 'text'},
    {name: 'after_time', title: 'Після: час', type: 'string', components: {input: TimeInput}, description: 'Час після події (за потреби).'},
    {name: 'after_details', title: 'Після: деталі', type: 'text'},
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}, description: 'Необов’язково. Якщо не потрібно — залиште порожнім.'},
    {name: 'link', title: 'Посилання', type: 'url', description: 'Наприклад: сторінка Facebook або Google Maps.'},
    {name: 'auto_translated', title: 'Автоматично перекладено', type: 'boolean', readOnly: true},
  ],
  preview: {
    select: {title: 'title', date: 'date', time: 'time', cat: 'category'},
    prepare: ({title, date, time, cat}) => ({
      title: `${cat || ''} ${date || ''} ${time || ''}`.trim(),
      subtitle: title,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Дата (спад.)', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Дата (зрост.)', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}
