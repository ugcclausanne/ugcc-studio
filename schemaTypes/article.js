export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'email', title: 'Email (log)', type: 'string', hidden: true},
    {name: 'excerpt', title: 'Excerpt', type: 'text'},
    {
      name: 'category',
      title: 'Category',
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
      title: 'Language',
      type: 'string',
      options: {list: [
        {title: 'Ukrainian', value: 'uk'},
        {title: 'English', value: 'en'},
        {title: 'French', value: 'fr'},
      ]},
      validation: (r) => r.required(),
    },
    {name: 'image', title: 'Main Image', type: 'image', options: {hotspot: true}},
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    },
    {name: 'author', title: 'Author', type: 'string'},
    {name: 'auto_translated', title: 'Auto Translated', type: 'boolean'},
  ],
  preview: {
    select: {title: 'title', ts: 'timestamp', lang: 'language', cat: 'category'},
    prepare: ({title, ts, lang, cat}) => ({
      title,
      subtitle: `${cat || ''} • ${lang || ''} • ${ts || ''}`,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Timestamp desc', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Timestamp asc', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}
