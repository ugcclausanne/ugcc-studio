import PreviewPane from './components/PreviewPane'

export default (S) =>
  S.list()
    .title('Зміст')
    .items([
      S.listItem()
        .title('Статті')
        .child(
          S.list()
            .title('Статті')
            .items([
              S.listItem()
                .title('Усі')
                .child(
                  S.documentTypeList('article')
                    .title('Усі статті')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('article')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
              S.listItem()
                .title('Новини')
                .child(
                  S.documentTypeList('article')
                    .title('Новини')
                    .filter('_type == "article" && category == "news"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('article')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
              S.listItem()
                .title('Духовність')
                .child(
                  S.documentTypeList('article')
                    .title('Духовність')
                    .filter('_type == "article" && category == "spiritual"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('article')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
              S.listItem()
                .title('Спільнота')
                .child(
                  S.documentTypeList('article')
                    .title('Спільнота')
                    .filter('_type == "article" && category == "community"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('article')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
            ])
        ),

      S.listItem()
        .title('Розклад')
        .child(
          S.list()
            .title('Розклад')
            .items([
              S.listItem()
                .title('Усі')
                .child(
                  S.documentTypeList('schedule')
                    .title('Усі події')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('schedule')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
              S.listItem()
                .title('Літургії')
                .child(
                  S.documentTypeList('schedule')
                    .title('Літургії')
                    .filter('_type == "schedule" && category == "liturgy"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('schedule')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
              S.listItem()
                .title('Оголошення')
                .child(
                  S.documentTypeList('schedule')
                    .title('Оголошення')
                    .filter('_type == "schedule" && category == "announcement"')
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('schedule')
                        .views([
                          S.view.form(),
                          S.view.component(PreviewPane).title("Прев'ю"),
                        ])
                    )
                ),
            ])
        ),
    ]);
