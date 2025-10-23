import S from 'sanity/desk'

const deskStructure = (S) =>
  S.list()
    .title('Контент')
    .items([
      S.listItem().title('Статті').schemaType('article').child(S.documentTypeList('article').title('Статті')),
      S.listItem().title('Розклад').schemaType('schedule').child(S.documentTypeList('schedule').title('Розклад')),
    ])


export default deskStructure

