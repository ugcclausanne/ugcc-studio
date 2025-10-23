export default {
  name: 'article',
  title: 'Стаття',
  type: 'document',
  fields: [
    {name: 'title', title: 'Заголовок', type: 'string', validation: (r) => r.required()},
    {name: 'timestamp', title: 'Час публікації', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'email', title: 'Email (лог)', type: 'string', hidden: true},
    {name: 'excerpt', title: 'Короткий опис', type: 'text'},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Новини', value: 'news'},
        {title: 'Духовне', value: 'spiritual'},
        {title: 'Громада', value: 'community'},
      ]},
      validation: (r) => r.required(),
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
      validation: (r) => r.required(),
    },
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}},
    {
      name: 'content',
      title: 'Контент',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    },
    {name: 'author', title: 'Автор', type: 'string'},
    {name: 'auto_translated', title: 'Автопереклад', type: 'boolean'},
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
