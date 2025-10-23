import TimeInput from '../components/TimeInput'
export default {
  name: 'schedule',
  title: 'Розклад',
  type: 'document',
  fields: [
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'date', title: 'Дата', type: 'date', description: 'Дата події (визначає відбір та сортування на сайті).', validation: r => r.required(), initialValue: '$today'},
    {name: 'time', title: 'Час', type: 'string', components: {input: TimeInput}, description: 'Початок події у форматі HH:mm. Працює з пікером.', validation: r => r.required(), initialValue: '$time'},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Літургія', value: 'liturgy'},
        {title: 'Оголошення', value: 'announcement'},
      ]},
      description: 'Тип події для відображення на сайті.'
    },
    {name: 'title', title: 'Заголовок', type: 'string', validation: r => r.required(), description: 'Коротка назва події.'},
    {name: 'details', title: 'Деталі', type: 'text', description: 'Декілька речень (необов’язково).'},
    {name: 'location', title: 'Локація', type: 'string', description: 'Наприклад: Храм Святого Миколая.'},
    {
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {list: [
        {title: 'Українська', value: 'uk'},
        {title: 'English', value: 'en'},
        {title: 'Français', value: 'fr'},
      ]},
      description: 'Мова оригіналу. Інші мови додаються під час синку.',
      validation: r => r.required(),
    },
    {name: 'before_time', title: 'Перед: час', type: 'string', components: {input: TimeInput}, description: 'Час перед подією (необов’язково).'},
    {name: 'before_details', title: 'Перед: деталі', type: 'text'},
    {name: 'after_time', title: 'Після: час', type: 'string', components: {input: TimeInput}, description: 'Час після події (необов’язково).'},
    {name: 'after_details', title: 'Після: деталі', type: 'text'},
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}, description: 'Необов’язково. Якщо нема — сайт підставить випадкове зображення.'},
    {name: 'link', title: 'Посилання', type: 'url', description: 'Опційно: детальніше на окремій сторінці/події.'},
    {name: 'auto_translated', title: 'Автопереклад', type: 'boolean', readOnly: true},
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
