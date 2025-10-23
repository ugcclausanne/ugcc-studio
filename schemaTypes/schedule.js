import TimeInput from '../components/TimeInput'
export default {
  name: 'schedule',
  title: '�������',
  type: 'document',
  fields: [
    {name: 'timestamp', title: 'Timestamp', type: 'datetime', validation: (r) => r.required()},
    {name: 'date', title: '����', type: 'date'},
    {name: 'time', title: '���', type: 'string', components: {input: TimeInput}, validation: r => r.required().regex(/^([01]\\d|2[0-3]):[0-5]\\d$/, {name: 'HH:mm'}).error('������ HH:mm, ����. 09:30')},
    {
      name: 'category',
      title: '��������',
      type: 'string',
      options: {list: [
        {title: 'Liturgy', value: 'liturgy'},
        {title: 'Announcement', value: 'announcement'},
      ]},
    },
    {name: 'title', title: '���������', type: 'string', validation: (r) => r.required()},
    {name: 'details', title: '�����', type: 'text'},
    {name: 'location', title: '�������', type: 'string'},
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
    {name: 'before_time', title: '�����: ���', type: 'string', components: {input: TimeInput}, validation: r => r.regex(/^$|^([01]\\d|2[0-3]):[0-5]\\d$/, {name: 'HH:mm'})},
    {name: 'before_details', title: '�����: �����', type: 'text'},
    {name: 'after_time', title: 'ϳ���: ���', type: 'string', components: {input: TimeInput}, validation: r => r.regex(/^$|^([01]\\d|2[0-3]):[0-5]\\d$/, {name: 'HH:mm'})},
    {name: 'after_details', title: 'ϳ���: �����', type: 'text'},
    {name: 'image', title: '����������', type: 'image', options: {hotspot: true}},
    {name: 'link', title: '���������', type: 'url'},
    {name: 'auto_translated', title: '������������', type: 'boolean'},
  ],
  preview: {
    select: {title: '���������', date: 'date', time: 'time', cat: 'category'},
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



