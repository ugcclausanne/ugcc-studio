export default {
  name: 'schedule',
  title: 'Schedule Item',
  type: 'document',
  fields: [
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', validation: (r) => r.required()},
    {name: 'date', title: 'Date', type: 'date'},
    {name: 'time', title: 'Time', type: 'string'},
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: [
        {title: 'Liturgy', value: 'liturgy'},
        {title: 'Announcement', value: 'announcement'},
      ]},
    },
    {name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()},
    {name: 'details', title: 'Details', type: 'text'},
    {name: 'location', title: 'Location', type: 'string'},
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
    {name: 'before_time', title: 'Before: Time', type: 'string'},
    {name: 'before_details', title: 'Before: Details', type: 'text'},
    {name: 'after_time', title: 'After: Time', type: 'string'},
    {name: 'after_details', title: 'After: Details', type: 'text'},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'link', title: 'Link', type: 'url'},
    {name: 'auto_translated', title: 'Auto Translated', type: 'boolean'},
  ],
  preview: {
    select: {title: 'title', date: 'date', time: 'time', cat: 'category'},
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

