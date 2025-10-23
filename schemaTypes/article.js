export default {
  name: 'article',
  title: 'Стаття',
  type: 'document',
  fields: [
    {name: 'title', title: 'Заголовок', type: 'string', description: 'Коротка назва публікації', validation: (r) => r.required()},
    {name: 'timestamp', title: 'Час публікації', type: 'datetime', hidden: true, initialValue: () => new Date().toISOString()},
    {name: 'email', title: 'Email (службовий)', type: 'string', hidden: true, description: 'Лише для службового використання. Не показується на сайті.'},
    {name: 'excerpt', title: 'Короткий опис', type: 'text', description: '1–2 речення для короткого опису.'},
    {
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {list: [
        {title: 'Новини', value: 'news'},
        {title: 'Духовність', value: 'spiritual'},
        {title: 'Спільнота', value: 'community'},
      ]},
      description: 'Оберіть категорію для публікації.',
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
      description: 'Оберіть мову публікації. Може відрізнятися від мови сайту.',
      validation: (r) => r.required(),
    },
    {name: 'image', title: 'Зображення', type: 'image', options: {hotspot: true}, description: 'Необов’язково. Якщо не потрібно — залиште порожнім.'},
    {
      name: 'content',
      title: 'Контент',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Звичайний', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [{title: 'Маркер', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Жирний', value: 'strong'},
              {title: 'Курсив', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Посилання',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
        {type: 'image', options: {hotspot: true}},
      ],
      description: 'Основний текст. Доступні H2/H3, списки та посилання.',
    },
    {name: 'author', title: 'Автор', type: 'string'},
    {name: 'auto_translated', title: 'Автоматично перекладено', type: 'boolean', readOnly: true},
  ],
  preview: {
    select: {title: 'title', ts: 'timestamp', lang: 'language', cat: 'category'},
    prepare: ({title, ts, lang, cat}) => ({
      title,
      subtitle: `${cat || ''} • ${lang || ''} • ${ts || ''}`,
    }),
  },
  orderings: [
    {name: 'timestampDesc', title: 'Дата (спад.)', by: [{field: 'timestamp', direction: 'desc'}]},
    {name: 'timestampAsc', title: 'Дата (зрост.)', by: [{field: 'timestamp', direction: 'asc'}]},
  ],
}

