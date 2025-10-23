import S from 'sanity/desk'

const deskStructure = (S) =>
  S.list()
    .title('�������')
    .items([
      S.listItem().title('�����').schemaType('article').child(S.documentTypeList('article').title('�����')),
      S.listItem().title('�������').schemaType('schedule').child(S.documentTypeList('schedule').title('�������')),
    ])


export default deskStructure

