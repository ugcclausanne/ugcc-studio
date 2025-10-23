export default {
  name: 'article',
  title: 'Стаття',
  type: 'document',
  fields: [
    {name: 'title', title: 'Заголовок', type: 'string', validation: (r) => r.required()},
    {name: 'slug', title: 'Слаг', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'timestamp', title: 'Час публікації', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()}
    {name: 'email', title: 'Email (лог)'
, type: 'string'},
    {name: 'excerpt', title: 'Короткий опис', type: 'text'},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'News', value: 'news'},
        {title: 'Spiritual', value: 'spiritual'},
        {title: 'Community', value: 'community'},
      ]},
      validation: (r) => r.required(),
    },
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
    select: {title: 'Заголовок', ts: 'timestamp', lang: 'language', cat: 'category'},
    prepare: ({title, ts, lang, cat}) => ({
      title,
      subtitle: `${cat || ''} вЂў ${lang || ''} вЂў ${ts || ''}`,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Timestamp desc', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Timestamp asc', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}



