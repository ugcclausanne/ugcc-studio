import S from 'sanity/desk'

export default () =>
  S.list()
    .title('�������')
    .items([
      S.listItem().title('�����').schemaType('article').child(S.documentTypeList('article').title('�����')),
      S.listItem().title('�������').schemaType('schedule').child(S.documentTypeList('schedule').title('�������')),
    ])
