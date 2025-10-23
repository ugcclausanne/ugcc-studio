export default {
  name: 'article',
  title: 'Стаття',
  type: 'document',
  fields: [
    {name: 'title', title: 'Заголовок', type: 'string', description: 'Основний заголовок публікації', validation: r => r.required()},
    {name: 'timestamp', title: 'Час публікації', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'email', title: 'Email (лог)', type: 'string', hidden: true, description: 'Технічне поле для логів. На сайт не передається.'},
    {name: 'excerpt', title: 'Короткий опис', type: 'text', description: '1–2 речення для картки та прев’ю.'},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Новини', value: 'news'},
        {title: 'Духовне', value: 'spiritual'},
        {title: 'Громада', value: 'community'},
      ]},
      description: 'Куди піде стаття на сайті',
      validation: r => r.required(),
    },
    {
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {list: [
        {title: 'Українська', value: 'uk'},
        {title: 'English', value: 'en'},
        {title: 'Français', value: 'fr'},
      ]},
      description: 'Вкажіть мову оригіналу. Інші мови з’являться автоматично під час синку.',
      validation: r => r.required(),
    },
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}, description: 'Необов’язково. Якщо не вказати — сайт підставить випадкове зображення.'},
    {
      name: 'content',
      title: 'Контент',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
      description: 'Текст статті. Можна додавати зображення всередині.'
    },
    {name: 'author', title: 'Автор', type: 'string'},
    {name: 'auto_translated', title: 'Автопереклад', type: 'boolean', readOnly: true},
  ],
  preview: {
    select: {title: 'title', ts: 'timestamp', lang: 'language', cat: 'category'},
    prepare: ({title, ts, lang, cat}) => ({
      title,
      subtitle: `${cat || ''} • ${lang || ''} • ${ts || ''}`,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Час (спадно)', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Час (зрост.)', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}
