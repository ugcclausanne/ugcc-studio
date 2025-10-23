export default {
  name: 'article',
  title: '������',
  type: 'document',
  fields: [
    {name: 'title', title: '���������', type: 'string', validation: (r) => r.required()},
    {name: 'slug', title: '����', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'timestamp', title: '��� ���������', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()}
    {name: 'email', title: 'Email (���)'
, type: 'string'},
    {name: 'excerpt', title: '�������� ����', type: 'text'},
    {
      name: 'category',
      title: '��������',
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
      title: '����',
      type: 'string',
      options: {list: [
        {title: 'Ukrainian', value: 'uk'},
        {title: 'English', value: 'en'},
        {title: 'French', value: 'fr'},
      ]},
      validation: (r) => r.required(),
    },
    {name: 'image', title: '����������', type: 'image', options: {hotspot: true}},
    {
      name: 'content',
      title: '�������',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    },
    {name: 'author', title: '�����', type: 'string'},
    {name: 'auto_translated', title: '������������', type: 'boolean'},
  ],
  preview: {
    select: {title: '���������', ts: 'timestamp', lang: 'language', cat: 'category'},
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



